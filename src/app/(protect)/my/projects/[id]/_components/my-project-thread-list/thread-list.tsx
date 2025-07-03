import { Prisma } from "@/__generated__/prisma";
import { UserAvatar } from "@/app/(protect)/_components/user-avater";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import _ from "lodash";
import Link from "next/link";
import "server-only";
export interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
}

interface ThreadListProps {
  projectId: string;
  threadId?: string;
}

export async function ThreadList({ projectId, threadId }: ThreadListProps) {
  const threads = await getThreads(projectId);

  const latestMessages = await getLatestMessages(
    threads.map((t) => ({ id: t.id })),
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">スレッド</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {threads.map((thread) => (
            <Button
              key={thread.id}
              variant="ghost"
              className={cn(
                "w-full justify-start h-auto p-3 text-left",
                threadId === thread.id && "bg-muted",
              )}
              asChild
            >
              <Link href={`?tab=thread&thread=${thread.id}`}>
                <div className="flex items-start gap-3 w-full">
                  <UserAvatar profile={thread.profile} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm truncate">
                        {thread.profile.displayName}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xs text-muted-foreground">
                          {thread.id in latestMessages &&
                            new Date(
                              latestMessages[thread.id].createdAt,
                            ).toLocaleString("ja-JP")}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs w-[200px] text-muted-foreground truncate">
                      {thread.id in latestMessages &&
                        latestMessages[thread.id].message}
                    </p>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

async function getThreads(projectId: string) {
  return await prisma.projectThread.findMany({
    where: {
      projectId: projectId,
    },
    select: {
      id: true,
      profile: {
        select: {
          id: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });
}

async function getLatestMessages(
  threads: Array<{
    id: string;
  }>,
) {
  if (threads.length === 0) return {};

  const threadIds = threads.map((t) => t.id);

  const latestMessages = await prisma.$queryRaw<
    Array<{
      id: string;
      message: string;
      createdAt: Date;
      threadId: string;
    }>
  >(Prisma.sql`
  SELECT DISTINCT ON ("threadId")
    id,
    message,
    "createdAt",
    "threadId"
  FROM "ProjectMessage"
  WHERE "threadId" = ANY(${threadIds}::uuid[])
  ORDER BY "threadId", "createdAt" DESC
`);

  return _.keyBy(latestMessages, "threadId");
}
