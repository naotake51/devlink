import { ErrorMessage } from "@/components/error-message";
import { getSprints } from "@/utils/data/sprint";
import "server-only";
import { z } from "zod";
import { ProjectSprint } from "./_components/project-sprint";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectSprintsProps {
  params: Promise<{ id: string }>;
}

/**
 * @private
 */
export default async function ProjectSprints({ params }: ProjectSprintsProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const sprints = await getSprints(id);

  return (
    <div className="space-y-4 py-2">
      {/* TODO:: データが増えたら無限スクロールを実装する */}
      {sprints.map((sprint) => (
        <ProjectSprint key={sprint.id} sprint={sprint} />
      ))}
    </div>
  );
}
