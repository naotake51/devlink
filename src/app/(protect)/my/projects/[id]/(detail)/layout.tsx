import { Prisma, ProjectMemberRole } from "@/__generated__/prisma";
import { UserAvatar } from "@/app/(protect)/_components/user-avater";
import { ErrorMessage } from "@/components/error-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import merge from "lodash.merge";
import { ChevronLeftIcon, FilePenLineIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { z } from "zod";
import { profileSelectForUserAvatar } from "../../../../_components/user-avater";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

/**
 * @private
 */
interface MyProjectDetailPageProps {
  params: Promise<{ id: string }>;
  tabs: React.ReactNode;
}

export default async function MyProjectDetailLayout({
  params,
  tabs,
}: MyProjectDetailPageProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const project = await getProject(id);
  if (!project) {
    return <ErrorMessage code={404} />;
  }

  const owners = project.projectMembers.filter(
    (member) => member.role === ProjectMemberRole.OWNER,
  );

  return (
    <div>
      <Link href="/my">
        <p className="text-md font-bold mb-4 flex items-center gap-2">
          <ChevronLeftIcon />
          マイページへ戻る
        </p>
      </Link>
      <div className="space-y-4 flex-1">
        <Card
          style={{
            viewTransitionName: `my-project-${id}`,
          }}
        >
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{project.title}</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href={`/my/projects/${id}/edit`}>
                編集
                <FilePenLineIcon />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {owners.map((owner) => (
                <div className="flex items-center gap-2" key={owner.profile.id}>
                  <UserAvatar profile={owner.profile} />
                  <p className="text-sm font-medium">
                    {owner.profile.displayName}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(project.startDate).toLocaleDateString()}
            </p>
            {tabs}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function getProject(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      title: true,
      startDate: true,
      projectMembers: {
        select: {
          role: true,
          profile: {
            select: merge(
              { id: true, displayName: true } satisfies Prisma.ProfileSelect,
              profileSelectForUserAvatar,
            ),
          },
        },
      },
    },
  });

  return project;
}
