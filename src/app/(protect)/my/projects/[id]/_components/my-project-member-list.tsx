import { Prisma } from "@/__generated__/prisma";
import merge from "lodash.merge";
import "server-only";
import {
  MyProjectMember,
  projectMemberSelectForMyProjectMember,
} from "./my-project-member";

/**
 * @package
 */
export const projectSelectForMyProjectMemberList = {
  projectMembers: {
    select: merge(
      {
        profile: {
          select: {
            id: true,
          },
        },
      } satisfies Prisma.ProjectMemberSelect,
      projectMemberSelectForMyProjectMember,
    ),
  },
} satisfies Prisma.ProjectSelect;

type ProjectPayloadForMyProjectMemberList = Prisma.ProjectGetPayload<{
  select: typeof projectSelectForMyProjectMemberList;
}>;

interface MyProjectMemberListProps {
  project: ProjectPayloadForMyProjectMemberList;
}

/**
 * @package
 */
export function MyProjectMemberList({ project }: MyProjectMemberListProps) {
  const sortedProjectMembersByDevPoint = [...project.projectMembers].sort(
    (a, b) => b.devPoint - a.devPoint,
  );

  return (
    <div className="space-y-4 py-2">
      {sortedProjectMembersByDevPoint.map((projectMember) => (
        <MyProjectMember
          key={projectMember.profile.id}
          projectMember={projectMember}
        />
      ))}
    </div>
  );
}
