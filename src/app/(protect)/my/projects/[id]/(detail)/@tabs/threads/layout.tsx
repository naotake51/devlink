import { Prisma } from "@/__generated__/prisma";
import { ThreadList } from "@/app/(protect)/my/projects/[id]/(detail)/@tabs/threads/_components/thread-list";
import { ErrorMessage } from "@/components/error-message";
import prisma from "@/lib/prisma";
import _ from "lodash";
import "server-only";
import { z } from "zod";
import { TwoColumnsLayout } from "./_components/two-columns-layout";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface MyProjectThreadListProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export default async function MyProjectThreadsLayout({
  params,
  children,
}: MyProjectThreadListProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const threads = await getThreads(id);
  const latestMessages = await getLatestMessages(threads.map((t) => t.id));

  const threadsWithMessages = threads.map((thread) => {
    return {
      ...thread,
      latestMessage: latestMessages[thread.id] || null,
      href: `/my/projects/${id}/threads/${thread.id}`,
    };
  });

  return (
    <div className="space-y-4 py-2">
      <TwoColumnsLayout
        left={<ThreadList threads={threadsWithMessages} />}
        right={children}
      />
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

async function getLatestMessages(threadIds: string[]) {
  if (threadIds.length === 0) return {};

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
