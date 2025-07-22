import { ErrorMessage } from "@/components/error-message";
import { getProject } from "@/utils/data/project";
import "server-only";
import { z } from "zod";
import { ProjectDevPointSchedule } from "./_components/project-dev-point-schedule";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectDevPointProps {
  params: Promise<{ id: string }>;
}

/**
 * @private
 */
export default async function ProjectDevPoint({
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
