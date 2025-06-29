import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { ProjectDetail } from "./_components/project-detail";

/**
 * @private
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <Link href="/projects">
        <p className="text-md font-bold mb-4 flex items-center gap-2">
          <ChevronLeftIcon />
          プロジェクト一覧へ戻る
        </p>
      </Link>
      <div className="space-y-4 flex-1">
        <ProjectDetail projectId={id} />
      </div>
    </div>
  );
}
