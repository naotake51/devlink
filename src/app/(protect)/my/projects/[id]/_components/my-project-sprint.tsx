import { Prisma } from "@/__generated__/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { today } from "@/lib/date-utils";
import { createClient } from "@/utils/supabase/server";
import "server-only";

/**
 * @package
 */
export const sprintSelectForMyProjectSprint = {
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
} satisfies Prisma.SprintSelect;

type SprintPayloadForMyProjectSprint = Prisma.SprintGetPayload<{
  select: typeof sprintSelectForMyProjectSprint;
}>;

interface MyProjectSprintProps {
  sprint: SprintPayloadForMyProjectSprint;
}

/**
 * @package
 */
export async function MyProjectSprint({ sprint }: MyProjectSprintProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const _today = today();
  const isVotePeriod =
    _today >= sprint.voteStartDate && _today <= sprint.voteEndDate;

  const hasMyVote = sprint.sprintVotes.some(
    (vote) => vote.member.profileId === user!.id,
  );

  const isProjectMember = true; // TODO

  return (
    <Card className="flex flex-row">
      <CardHeader className="w-[250px]">
        <CardTitle className="w-[250px]">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="truncate text-lg">
              Sprint {sprint.sprintNumber}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <div className="flex items-center">
          <p className="w-[80px] text-sm">Sprint期間:</p>
          <p className="text-xs">
            {sprint.startDate.toLocaleDateString()} ~{" "}
            {sprint.endDate.toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center">
          <p className="w-[80px] text-sm">投票期間:</p>
          <p className="text-xs">
            {sprint.voteStartDate.toLocaleDateString()} ~{" "}
            {sprint.voteEndDate.toLocaleDateString()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        {isProjectMember &&
          isVotePeriod &&
          (hasMyVote ? (
            <Button variant="outline">投票済み</Button>
          ) : (
            <Button variant="destructive">投票する</Button>
          ))}
        {sprint.sprintDividend && <Button variant="outline">分配済み</Button>}
      </CardFooter>
    </Card>
  );
}
