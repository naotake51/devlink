import prisma from "@/lib/prisma";
import "server-only";
import { ProjectCard, projectSelectForProjectCard } from "./project-card";

interface ProjectCardListProps {
  query?: string;
}

export async function ProjectCardList({ query }: ProjectCardListProps) {
  const projects = await searchProjects(query ? query.trim() : undefined);

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
      ...{
        id: true,
      },
      ...projectSelectForProjectCard,
    },
    where: {
      /**
       * TODO::
       * 全角・半角、かな、カタカナなどあいまいな検索を実装する。
       * 将来的にはインデックス（転置）が必要になる。
       * PGroongaの使用を検討する。
       */
      OR: query
        ? [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ]
        : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return projects;
}
