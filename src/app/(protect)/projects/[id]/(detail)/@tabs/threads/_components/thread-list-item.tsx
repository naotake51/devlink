import { UserAvatar } from "@/app/(protect)/_components/user-avater";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface Thread {
  id: string;
  href: string;
  profile: {
    id: string;
    displayName: string;
    avatarUrl: string | null;
  };
  latestMessage: {
    id: string;
    message: string;
    createdAt: Date;
  } | null;
}

interface ThreadListItemProps {
  thread: Thread;
  isActive: boolean;
}

export function ThreadListItem({ thread, isActive }: ThreadListItemProps) {
  return (
    <Button
      key={thread.id}
      variant="ghost"
      className={cn(
        "w-full justify-start h-auto p-3 text-left",
        isActive && "bg-muted",
      )}
      asChild
    >
      <Link href={thread.href} className="w-full">
        <div className="flex items-start gap-3 w-full">
          <UserAvatar profile={thread.profile} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-sm truncate">
                {thread.profile.displayName}
              </h3>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs text-muted-foreground">
                  {thread.latestMessage &&
                    new Date(thread.latestMessage.createdAt).toLocaleString(
                      "ja-JP",
                    )}
                </span>
              </div>
            </div>
            <p className="text-xs w-[200px] text-muted-foreground truncate">
              {thread.latestMessage && thread.latestMessage.message}
            </p>
          </div>
        </div>
      </Link>
    </Button>
  );
}
