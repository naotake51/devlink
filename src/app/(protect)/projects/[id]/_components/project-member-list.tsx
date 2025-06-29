import { Prisma } from "@/__generated__/prisma";
import merge from "lodash.merge";
import "server-only";
import {
  ProjectMember,
  projectMemberSelectForProjectMember,
} from "./project-member";

/**
 * @package
 */
export const projectSelectForProjectMemberList = {
  projectMembers: {
    select: merge(
      {
        profile: {
          select: {
            id: true,
          },
        },
      } satisfies Prisma.ProjectMemberSelect,
      projectMemberSelectForProjectMember,
    ),
  },
} satisfies Prisma.ProjectSelect;

type ProjectPayloadForProjectMemberList = Prisma.ProjectGetPayload<{
  select: typeof projectSelectForProjectMemberList;
}>;

interface ProjectMemberListProps {
  project: ProjectPayloadForProjectMemberList;
}

/**
 * @package
 */
export function ProjectMemberList({ project }: ProjectMemberListProps) {
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
