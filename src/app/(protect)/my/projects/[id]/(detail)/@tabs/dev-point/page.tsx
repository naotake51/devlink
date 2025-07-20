import { ErrorMessage } from "@/components/error-message";
import prisma from "@/lib/prisma";
import "server-only";
import z from "zod";
import { ProjectDevPointSchedule } from "./_components/project-dev-point-schedule";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectDevPointProps {
  params: Promise<{ id: string }>;
}

/**
 * @package
 */
export default async function MyProjectDevPoint({
  params,
}: ProjectDevPointProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const project = await getProject(id);
  if (!project) {
    return <ErrorMessage code={404} />;
  }

  return (
    <div className="space-y-4 py-2">
      <ProjectDevPointSchedule project={project} />
    </div>
  );
}

async function getProject(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      startDate: true,
    },
  });

  return project;
}
