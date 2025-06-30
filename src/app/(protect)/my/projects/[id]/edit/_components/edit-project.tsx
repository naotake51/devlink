import { Prisma } from "@/__generated__/prisma";
import prisma from "@/lib/prisma";
import { EditProjectForm } from "./edit-project-form";

interface EditProjectProps {
  projectId: string;
}

export async function EditProject({ projectId }: EditProjectProps) {
  const project = await getProject(projectId);
  if (!project) {
    return <div>プロジェクトが見つかりません。</div>;
  }

  return <EditProjectForm project={project} />;
}

async function getProject(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      startDate: true,
    } satisfies Prisma.ProjectSelect,
  });

  return project;
}
