import { Badge } from "@/components/ui/badge";
import { getAuthUser } from "@/utils/data/auth";
import { getVote, getVotingSprint } from "@/utils/data/sprint";
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
