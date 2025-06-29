import { Prisma, ProjectMemberRole } from "@/__generated__/prisma";
import {
  UserAvatar,
  profileSelectForUserAvatar,
} from "@/app/(protect)/_components/user-avater";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import merge from "lodash.merge";
import Link from "next/link";
import "server-only";

/**
 * @package
 */
export const projectSelectForProjectCard = {
  id: true,
  title: true,
  serviceDescription: true,
  startDate: true,
  projectMembers: {
    select: {
      role: true,
      profile: {
        select: merge(
          {
            id: true,
            displayName: true,
          } satisfies Prisma.ProfileSelect,
          profileSelectForUserAvatar,
        ),
      },
    },
  },
} satisfies Prisma.ProjectSelect;

type ProjectPayloadForProjectCard = Prisma.ProjectGetPayload<{
  select: typeof projectSelectForProjectCard;
}>;

interface ProjectCardProps {
  project: ProjectPayloadForProjectCard;
}

/**
 * @package
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const owners = project.projectMembers.filter(
    (member) => member.role === ProjectMemberRole.OWNER,
  );
  return (
    <Card
      style={{
        viewTransitionName: `project-${project.id}`,
      }}
    >
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          {new Date(project.startDate).toLocaleDateString("ja-JP")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-4">
          {owners.map((owner) => (
            <div className="flex items-center gap-2" key={owner.profile.id}>
              <UserAvatar profile={owner.profile} />
              <p className="text-sm font-medium">{owner.profile.displayName}</p>
            </div>
          ))}
        </div>
        {project.serviceDescription && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.serviceDescription}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/projects/${project.id}`}>詳細を見る</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
