import { Prisma, ProjectMemberRole } from "@/__generated__/prisma";
import {
  UserAvatar,
  profileSelectForUserAvatar,
} from "@/app/(protect)/_components/user-avater";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import merge from "lodash.merge";
import { FilePenLineIcon } from "lucide-react";
import Link from "next/link";
import "server-only";

type ProjectDetailProps = {
  projectId: string;
};

export async function MyProjectDetail({ projectId }: ProjectDetailProps) {
  const project = await getProjectDetail(projectId);

  if (!project) {
    return <div>プロジェクトが見つかりません。</div>;
  }

  const owners = project.projectMembers.filter(
    (member) => member.role === ProjectMemberRole.OWNER,
  );

  return (
    <Card
      style={{
        viewTransitionName: `project-${projectId}`,
      }}
    >
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{project.title}</CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href={`/my/projects/${projectId}/edit`}>
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
              <p className="text-sm font-medium">{owner.profile.displayName}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date(project.createdAt).toLocaleString()}
        </p>
        <Markdown content={project.description ?? ""} />
      </CardContent>
    </Card>
  );
}

async function getProjectDetail(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
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
