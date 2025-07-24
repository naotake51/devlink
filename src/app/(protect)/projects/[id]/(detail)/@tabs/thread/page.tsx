import { UserAvatar } from "@/app/(protect)/_components/user-avatar";
import { ErrorMessage } from "@/components/error-message";
import { Markdown } from "@/components/markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { verifyAuthUser } from "@/utils/data/auth";
import { getMessages, getThreadByUser } from "@/utils/data/thread";
import "server-only";
import { z } from "zod";
import { MessageForm } from "./_components/message-form";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectThreadProps {
  params: Promise<{ id: string }>;
}

/**
 * @private
 */
export default async function ProjectThread({ params }: ProjectThreadProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const user = await verifyAuthUser();

  const thread = await getThreadByUser(id, user.id);

  const messages = thread ? await getMessages(thread.id) : [];

  return (
    <div className="space-y-4 py-2">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            プロジェクト管理者とのやりとり
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MessageForm projectId={id} threadProfileId={user.id} />
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
                      <UserAvatar profile={message.sender} size="sm" hasLink />
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
        </CardContent>
      </Card>
    </div>
  );
}
