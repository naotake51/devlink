import { ProjectMemberRole } from "@/__generated__/prisma";
import { UserAvatar } from "@/app/(protect)/_components/user-avater";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import "server-only";

interface MyProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string | null;
    startDate: Date;
    projectMembers: Array<{
      role: ProjectMemberRole;
      profile: {
        id: string;
        displayName: string;
        avatarUrl: string | null;
      };
    }>;
  };
}

/**
 * @package
 */
export function MyProjectCard({ project }: MyProjectCardProps) {
  const owners = project.projectMembers.filter(
    (member) => member.role === ProjectMemberRole.OWNER,
  );

  return (
    <Card>
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
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/projects/${project.id}/overview`}>詳細を見る</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
