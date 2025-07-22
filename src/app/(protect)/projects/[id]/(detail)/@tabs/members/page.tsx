import { ErrorMessage } from "@/components/error-message";
import { getProjectMembers } from "@/utils/data/project";
import "server-only";
import { z } from "zod";
import { ProjectMember } from "./_components/project-member";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectMembersProps {
  params: Promise<{ id: string }>;
}

/**
 * @private
 */
export default async function ProjectMembers({ params }: ProjectMembersProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const projectMembers = await getProjectMembers(id);

  const sortedProjectMembersByDevPoint = [...projectMembers].sort(
    (a, b) => b.devPoint - a.devPoint,
  );

  return (
    <div className="space-y-4 py-2">
      {sortedProjectMembersByDevPoint.map((projectMember) => (
        <ProjectMember
          key={projectMember.profile.id}
          projectMember={projectMember}
        />
      ))}
    </div>
  );
}
