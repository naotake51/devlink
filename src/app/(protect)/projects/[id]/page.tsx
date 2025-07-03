import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { z } from "zod";
import { ProjectDetail } from "./_components/project-detail";

const searchParamsSchema = z.object({
  tab: z.enum(["overview", "members", "dev-point", "thread"]).optional(),
});

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * @private
 */
export default async function ProjectDetailPage({
  params,
  searchParams,
}: ProjectDetailPageProps) {
  const { id } = await params;

  const q = searchParamsSchema.safeParse(await searchParams);
  if (!q.success) {
    console.error("Invalid search parameters:", q.error);
    return <p className="text-red-500">Invalid parameters</p>;
  }

  return (
    <div>
      <Link href="/projects">
        <p className="text-md font-bold mb-4 flex items-center gap-2">
          <ChevronLeftIcon />
          プロジェクト一覧へ戻る
        </p>
      </Link>
      <div className="space-y-4 flex-1">
        <ProjectDetail
          projectId={id}
          tab={typeof q.data.tab === "string" ? q.data.tab : "overview"}
        />
      </div>
    </div>
  );
}
