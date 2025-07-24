import { ErrorMessage } from "@/components/error-message";
import { getProjectsByQuery } from "@/utils/data/project";
import { SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import "server-only";
import { z } from "zod";
import { ProjectCardList } from "./_components/project-card-list";
import { ProjectSearchForm } from "./_components/project-search-form";

/**
 * @private
 */
export const metadata: Metadata = {
  title: "プロジェクト検索",
  description:
    "DevLinkでプロジェクトを検索して、自分にあったプロジェクトに参加しましょう。",
};

const searchParamsSchema = z.object({
  q: z.string().optional(),
});

/**
 * @private
 */
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const q = searchParamsSchema.safeParse(await searchParams);
  if (!q.success) {
    console.error("Invalid search parameters:", q.error);
    return <ErrorMessage code={400} />;
  }
  const { q: query } = q.data;

  const projects = await getProjectsByQuery(query ? query.trim() : undefined);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <SearchIcon />
        プロジェクトを探す
      </h1>
      <div className="space-y-4">
        <ProjectSearchForm />
        <div className="text-sm text-muted-foreground mb-4">
          {query
            ? `「${query}」で検索した結果、${projects.length} 件のプロジェクトが見つかりました。`
            : `${projects.length} 件のプロジェクトがあります。`}
        </div>{" "}
        <ProjectCardList projects={projects} />
      </div>
    </div>
  );
}
