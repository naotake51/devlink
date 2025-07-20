"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelectedLayoutSegment } from "next/navigation";
import { Thread, ThreadListItem } from "./thread-list-item";

interface ThreadListProps {
  threads: Thread[];
}

export function ThreadList({ threads }: ThreadListProps) {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">スレッド</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {threads.map((thread) => (
            <ThreadListItem
              key={thread.id}
              thread={thread}
              isActive={selectedSegment === thread.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
