import { MessageList } from "@/app/(protect)/my/projects/[id]/_components/my-project-thread-list/message-list";
import { ThreadList } from "@/app/(protect)/my/projects/[id]/_components/my-project-thread-list/thread-list";
import { Card, CardContent } from "@/components/ui/card";
import "server-only";
interface MyProjectThreadListProps {
  projectId: string;
  threadId?: string;
}

export function MyProjectThreadList({
  projectId,
  threadId,
}: MyProjectThreadListProps) {
  return (
    <>
      {/* デスクトップ用 */}
      <div className="space-y-4 py-2 hidden lg:block">
        <Card className="p-0 overflow-auto">
          <CardContent className="flex h-full w-full p-0">
            <div className="w-80 border-r">
              <ThreadList projectId={projectId} threadId={threadId} />
            </div>
            <div className="flex-1">
              <MessageList projectId={projectId} threadId={threadId} />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* モバイル用コンテンツ切り替え */}
      <div className="space-y-4 py-2 lg:hidden ">
        <Card className="p-0 overflow-auto">
          <CardContent className="flex h-full w-full p-0">
            {!threadId ? (
              <ThreadList projectId={projectId} threadId={threadId} />
            ) : (
              <MessageList
                projectId={projectId}
                threadId={threadId}
                showBackButton
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
