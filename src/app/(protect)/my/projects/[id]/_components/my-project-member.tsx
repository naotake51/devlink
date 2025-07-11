import { Prisma } from "@/__generated__/prisma";
import {
  UserAvatar,
  profileSelectForUserAvatar,
} from "@/app/(protect)/_components/user-avater";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import merge from "lodash.merge";
import "server-only";

/**
 * @package
 */
export const projectMemberSelectForMyProjectMember = {
  devPoint: true,
  createdAt: true,
  profile: {
    select: merge(
      {
        displayName: true,
      },
      profileSelectForUserAvatar,
    ),
  },
} satisfies Prisma.ProjectMemberSelect;

type ProjectMemberPayloadForMyProjectMember = Prisma.ProjectMemberGetPayload<{
  select: typeof projectMemberSelectForMyProjectMember;
}>;

interface MyProjectMemberProps {
  projectMember: ProjectMemberPayloadForMyProjectMember;
}

/**
 * @package
 */
export function MyProjectMember({ projectMember }: MyProjectMemberProps) {
  return (
    <Card className="flex flex-row">
      <CardHeader className="w-[250px]">
        <CardTitle className="w-[250px]">
          <div className="flex items-center gap-2 overflow-hidden">
            <UserAvatar profile={projectMember.profile} size="lg" />
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
