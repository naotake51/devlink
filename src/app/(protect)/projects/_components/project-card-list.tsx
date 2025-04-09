import prisma from "@/lib/prisma";
import "server-only";
import { ProjectCard, projectSelectForProjectCard } from "./project-card";

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
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      ...projectSelectForProjectCard,
    },
    where: {
      title: query
        ? {
            contains: query,
            mode: "insensitive",
          }
        : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return projects;
}
