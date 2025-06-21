import { Badge } from "@/components/ui/badge";
import { today } from "@/lib/date-utils";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import "server-only";

type ProjectDetailProps = {
  projectId: string;
};

export async function MyProjectSprintNoticeBadge({
  projectId,
}: ProjectDetailProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sprint = await getVotingSprint(projectId);
  if (!sprint) return null;

  const vote = await getVote(sprint.id, user!.id);
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
