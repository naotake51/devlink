import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { MyProjectDetail } from "./_components/my-project-detail";

/**
 * @private
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <Link href="/my">
        <p className="text-md font-bold mb-4 flex items-center gap-2">
          <ChevronLeftIcon />
          マイページへ戻る
        </p>
      </Link>
      <div className="space-y-4 flex-1">
        <MyProjectDetail projectId={(await params).id} />
      </div>
    </div>
  );
}
