import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="text-center space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-purple-400 mx-auto" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-purple-200 mx-auto animate-pulse" />
      </div>
      <div className="space-y-2">
        <h2 className="text-md text-purple-400">読み込み中...</h2>
      </div>
    </div>
  );
}
