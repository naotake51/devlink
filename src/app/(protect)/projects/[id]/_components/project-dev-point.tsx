import { Prisma } from "@/__generated__/prisma";
import merge from "lodash.merge";
import "server-only";
import {
  ProjectDevPointSchedule,
  projectSelectForProjectDevPointSchedule,
} from "./project-dev-point-schedule";

/**
 * @package
 */
export const projectSelectForProjectDevPoint = merge(
  {} satisfies Prisma.ProjectSelect,
  projectSelectForProjectDevPointSchedule,
);

type ProjectPayloadForProjectDevPoint = Prisma.ProjectGetPayload<{
  select: typeof projectSelectForProjectDevPoint;
}>;

interface ProjectDevPointProps {
  project: ProjectPayloadForProjectDevPoint;
}

/**
 * @package
 */
export function ProjectDevPoint({ project }: ProjectDevPointProps) {
  return (
    <div className="space-y-4 py-2">
      <ProjectDevPointSchedule project={project} />
    </div>
  );
}
