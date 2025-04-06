import { createClient } from "@/utils/supabase/server";
import "server-only";
import { PROJECT_CARD_FIELDS, ProjectCard } from "./project-card";

interface SearchParams {
  q?: string;
}

export async function ProjectCardList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = (await searchParams).q?.trim();

  const projects = await searchProjects(query);

  return (
    <>
      <div className="text-sm text-muted-foreground mb-4">
        {query
          ? `「${query}」で検索した結果、${projects.length} 件のプロジェクトが見つかりました。`
          : `${projects.length} 件のプロジェクトがあります。`}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

async function searchProjects(query?: string) {
  const supabase = await createClient();

  const queryBuilder = supabase.from("projects").select(PROJECT_CARD_FIELDS);

  if (query) {
    /**
     * TODO::
     * 全角・半角、かな、カタカナなどあいまいな検索を実装する。
     * PGroongaの使用を検討する。
     */
    queryBuilder.ilike("title", `%${query}%`);
  }

  const { data: projects, error } = await queryBuilder;

  if (error) {
    throw error;
  }

  return projects;
}
