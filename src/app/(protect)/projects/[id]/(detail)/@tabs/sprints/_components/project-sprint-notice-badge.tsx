import { Badge } from "@/components/ui/badge";
import { today } from "@/lib/date-utils";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/utils/data/auth";
import "server-only";

type ProjectSprintNoticeBadgeProps = {
  projectId: string;
};

export async function ProjectSprintNoticeBadge({
  projectId,
}: ProjectSprintNoticeBadgeProps) {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const sprint = await getVotingSprint(projectId);
  if (!sprint) return null;

  const vote = await getVote(sprint.id, user.id);
  if (vote) return null;

  return (
    <Badge variant="destructive" className="rounded-full">
      1
    </Badge>
  );
}

async function getVotingSprint(projectId: string) {
  const _today = today();

  return await prisma.sprint.findFirst({
    where: {
      projectId: projectId,
      voteStartDate: {
        lte: _today,
      },
      voteEndDate: {
        gte: _today,
      },
    },
    select: {
      id: true,
    },
  });
}

async function getVote(sprintId: string, userId: string) {
  return await prisma.sprintVote.findFirst({
    where: {
      sprintId: sprintId,
      member: {
        profileId: userId,
      },
    },
  });
}
