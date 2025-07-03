import { UserAvatar } from "@/app/(protect)/_components/user-avater";
// TODO: 共通で使用したいので、ディレクトリを整理する
import { MessageForm } from "@/app/(protect)/projects/[id]/_components/message-form";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import "server-only";

interface MessageListProps {
  projectId: string;
  threadId?: string;
  showBackButton?: boolean;
}

export async function MessageList({
  projectId,
  threadId,
  showBackButton = false,
}: MessageListProps) {
  if (!threadId) {
    return (
      <div className="flex items-center justify-center h-full w-full text-muted-foreground p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">
            スレッドを選択してください
          </h3>
          <p className="text-sm">
            左側のリストからスレッドを選択してメッセージを表示します
          </p>
        </div>
      </div>
    );
  }

  const thread = await prisma.projectThread.findUnique({
    where: {
      id: threadId,
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
      messages: {
        select: {
          id: true,
          createdAt: true,
          message: true,
          sender: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!thread) {
    return (
      <div className="flex items-center justify-center h-full w-full text-muted-foreground p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">
            スレッドが見つかりません。
          </h3>
          <p className="text-sm">
            すでに削除されたか、存在しない可能性があります。
          </p>
          {showBackButton && (
            <Button variant="link" size="icon" className="mt-8" asChild>
              <Link href={`?tab=thread`}>スレッド一覧へ戻る</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-[28px]"
              asChild
            >
              <Link href={`?tab=thread`}>
                <ChevronLeft />
              </Link>
            </Button>
          )}
          <h2 className="text-lg font-semibold">
            {thread.profile.displayName}
          </h2>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <MessageForm
            projectId={projectId}
            threadProfileId={thread.profile.id}
          />
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
            {thread.messages.length === 0 ? (
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
              thread.messages.map((message) => (
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
