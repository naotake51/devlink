import { SearchIcon } from "lucide-react";
import "server-only";
import { ProjectCardList } from "./_components/project-card-list";
import { ProjectSearchForm } from "./_components/project-search-form";

interface SearchParams {
  q?: string;
}

/**
 * @private
 */
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <SearchIcon />
        プロジェクトを探す
      </h1>
      <div className="space-y-4">
        <ProjectSearchForm />
        <ProjectCardList searchParams={searchParams} />
      </div>
    </div>
  );
}
