import { UserAvatar } from "@/app/(protect)/_components/user-avater";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "server-only";

interface ProjectMemberProps {
  projectMember: {
    profile: {
      id: string;
      avatarUrl: string | null;
      displayName: string;
    };
    devPoint: number;
    createdAt: Date;
  };
}

export function ProjectMember({ projectMember }: ProjectMemberProps) {
  return (
    <Card className="flex flex-row">
      <CardHeader className="w-[250px]">
        <CardTitle className="w-[250px]">
          <div className="flex items-center gap-2 overflow-hidden">
            <UserAvatar profile={projectMember.profile} size="lg" hasLink />
            <span className="truncate text-lg">
              {projectMember.profile.displayName}
            </span>
          </div>
        </CardTitle>
        <CardDescription className="text-xs">
          {new Date(projectMember.createdAt).toLocaleDateString("ja-JP")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1"></CardContent>
      <CardFooter>
        <div>
          <span className="text-2xl">{projectMember.devPoint}</span>
          <span className="text-gray-500 ml-1 text-sm">dev point</span>
        </div>
      </CardFooter>
    </Card>
  );
}
