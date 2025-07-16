import { ErrorMessage } from "@/components/error-message";
import { SearchIcon } from "lucide-react";
import "server-only";
import { z } from "zod";
import { ProjectCardList } from "./_components/project-card-list";
import { ProjectSearchForm } from "./_components/project-search-form";

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <SearchIcon />
        プロジェクトを探す
      </h1>
      <div className="space-y-4">
        <ProjectSearchForm />
        <ProjectCardList query={query} />
      </div>
    </div>
  );
}
