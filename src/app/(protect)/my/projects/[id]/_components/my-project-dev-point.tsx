import { Prisma } from "@/__generated__/prisma";
import merge from "lodash.merge";
import "server-only";
import {
  MyProjectDevPointSchedule,
  projectSelectForMyProjectDevPointSchedule,
} from "./my-project-dev-point-schedule";

/**
 * @package
 */
export const projectSelectForMyProjectDevPoint = merge(
  {} satisfies Prisma.ProjectSelect,
  projectSelectForMyProjectDevPointSchedule,
);

type ProjectPayloadForMyProjectDevPoint = Prisma.ProjectGetPayload<{
  select: typeof projectSelectForMyProjectDevPoint;
}>;

interface MyProjectDevPointProps {
  project: ProjectPayloadForMyProjectDevPoint;
}

/**
 * @package
 */
export function MyProjectDevPoint({ project }: MyProjectDevPointProps) {
  return (
    <div className="space-y-4 py-2">
      <MyProjectDevPointSchedule project={project} />
    </div>
  );
}
