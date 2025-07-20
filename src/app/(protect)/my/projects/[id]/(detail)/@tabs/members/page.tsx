import { ErrorMessage } from "@/components/error-message";
import prisma from "@/lib/prisma";
import "server-only";
import { z } from "zod";
import { ProjectMember } from "./_components/project-member";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface MyProjectMembersProps {
  params: Promise<{ id: string }>;
}

/**
 * @package
 */
export default async function MyProjectMembers({
  params,
}: MyProjectMembersProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const project = await getProjectWithMembers(id);
  if (!project) {
    return <ErrorMessage code={404} />;
  }

  const sortedProjectMembersByDevPoint = [...project.projectMembers].sort(
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

async function getProjectWithMembers(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      projectMembers: {
        select: {
          profile: {
            select: {
              id: true,
              avatarUrl: true,
              displayName: true,
            },
          },
          devPoint: true,
          createdAt: true,
        },
      },
    },
  });

  return project;
}
