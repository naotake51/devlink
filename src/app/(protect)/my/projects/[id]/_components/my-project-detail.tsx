import { Prisma, ProjectMemberRole } from "@/__generated__/prisma";
import {
  UserAvatar,
  profileSelectForUserAvatar,
} from "@/app/(protect)/_components/user-avater";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import merge from "lodash.merge";
import { FilePenLineIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { MyProjectDevPoint } from "./my-project-dev-point";
import {
  MyProjectMemberList,
  projectSelectForMyProjectMemberList,
} from "./my-project-member-list";
import { MyProjectSprintList } from "./my-project-sprint-list";
import { MyProjectSprintNoticeBadge } from "./my-project-sprint-notice-badge";

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
        viewTransitionName: `my-project-${projectId}`,
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
          {new Date(project.startDate).toLocaleDateString()}
        </p>
        <Tabs defaultValue="detail">
          <TabsList>
            <TabsTrigger value="detail">概要</TabsTrigger>
            <TabsTrigger value="members">メンバー</TabsTrigger>
            <TabsTrigger value="dev-point">Dev Point</TabsTrigger>
            <TabsTrigger value="sprints">
              Sprint
              <MyProjectSprintNoticeBadge projectId={project.id} />
            </TabsTrigger>
            <TabsTrigger value="resolutions">決議</TabsTrigger>
            <TabsTrigger value="settings">設定</TabsTrigger>
          </TabsList>
          <TabsContent value="detail">
            <Markdown content={project.description ?? ""} />
          </TabsContent>
          <TabsContent value="members">
            <MyProjectMemberList project={project} />
          </TabsContent>
          <TabsContent value="dev-point">
            <MyProjectDevPoint project={project} />
          </TabsContent>
          <TabsContent value="sprints">
            <MyProjectSprintList project={project} />
          </TabsContent>
          <TabsContent value="resolutions">
            決議（Protected）
            メンバー採用・メンバー解雇・プロジェクト方針決定など
          </TabsContent>
          <TabsContent value="settings">
            設定（Protected） 削除機能など
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

async function getProjectDetail(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: merge(
      {
        id: true,
        title: true,
        description: true,
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
      } satisfies Prisma.ProjectSelect,
      projectSelectForMyProjectMemberList,
    ),
  });

  return project;
}
