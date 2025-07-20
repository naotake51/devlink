import { ErrorMessage } from "@/components/error-message";
import prisma from "@/lib/prisma";
import "server-only";
import z from "zod";
import { ProjectSprint } from "./_components/project-sprint";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface MyProjectSprintsProps {
  params: Promise<{ id: string }>;
}

/**
 * @package
 */
export default async function MyProjectSprints({
  params,
}: MyProjectSprintsProps) {
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

async function getSprints(projectId: string) {
  return prisma.sprint.findMany({
    where: {
      projectId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      sprintNumber: true,
      voteStartDate: true,
      voteEndDate: true,
      sprintVotes: {
        select: {
          id: true,
          member: {
            select: {
              profileId: true,
            },
          },
        },
      },
      sprintDividend: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      sprintNumber: "desc",
    },
  });
}
