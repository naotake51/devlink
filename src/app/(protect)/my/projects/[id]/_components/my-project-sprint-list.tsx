import { Prisma } from "@/__generated__/prisma";
import prisma from "@/lib/prisma";
import "server-only";
import {
  MyProjectSprint,
  sprintSelectForMyProjectSprint,
} from "./my-project-sprint";

/**
 * @package
 */
export const projectSelectForMyProjectSprint = {
  id: true,
} satisfies Prisma.ProjectSelect;

type ProjectPayloadForMyProjectSprint = Prisma.ProjectGetPayload<{
  select: typeof projectSelectForMyProjectSprint;
}>;

interface MyProjectSprintProps {
  project: ProjectPayloadForMyProjectSprint;
}

/**
 * @package
 */
export async function MyProjectSprintList({ project }: MyProjectSprintProps) {
  const sprints = await getSprints(project.id);

  return (
    <div className="space-y-4 py-2">
      {/* TODO:: データが増えたら無限スクロールを実装する */}
      {sprints.map((sprint) => (
        <MyProjectSprint key={sprint.id} sprint={sprint} />
      ))}
    </div>
  );
}

async function getSprints(projectId: string) {
  return prisma.sprint.findMany({
    where: {
      projectId,
    },
    select: sprintSelectForMyProjectSprint,
    orderBy: {
      sprintNumber: "desc",
    },
  });
}
