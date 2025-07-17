import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-purple-400 mx-auto" />
            <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-purple-200 mx-auto animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg text-purple-400">読み込み中...</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
