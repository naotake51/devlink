import { getProjectsByQuery } from "@/utils/data/project";
import "server-only";
import { ProjectCard } from "./project-card";

interface ProjectCardListProps {
  query?: string;
}

export async function ProjectCardList({ query }: ProjectCardListProps) {
  const projects = await getProjectsByQuery(query ? query.trim() : undefined);

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
