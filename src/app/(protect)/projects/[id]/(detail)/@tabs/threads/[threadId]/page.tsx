import { UserAvatar } from "@/app/(protect)/_components/user-avater";
import { MessageForm } from "@/app/(protect)/projects/[id]/(detail)/@tabs/thread/_components/message-form";
import { ErrorMessage } from "@/components/error-message";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getMessages, getThread } from "@/utils/data/thread";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import "server-only";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().uuid(),
  threadId: z.string().uuid(),
});

interface SelectedThreadProps {
  params: Promise<{ threadId: string }>;
}

export default async function SelectedThread({ params }: SelectedThreadProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id, threadId } = p.data;

  const thread = await getThread(id, threadId);
  if (!thread) {
    return <ErrorMessage code={404} />;
  }

  const messages = await getMessages(thread.id);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-[28px] lg:hidden"
            asChild
          >
            <Link href={`/projects/${id}/threads`}>
              <ChevronLeft />
            </Link>
          </Button>
          <h2 className="text-lg font-semibold">
            {thread.profile.displayName}
          </h2>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <MessageForm projectId={id} threadProfileId={thread.profile.id} />
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">💭</div>
                <p className="text-muted-foreground">
                  まだメッセージはありません。
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  プロジェクト管理者とのやりとりを開始しましょう。
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id}>
                  <div className="flex gap-3 hover:bg-gray-50/50 p-2 rounded-lg transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <UserAvatar profile={message.sender} size="sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {message.sender.displayName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleString("ja-JP", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="prose prose-sm max-w-none prose-gray">
                        <Markdown content={message.message} />
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
