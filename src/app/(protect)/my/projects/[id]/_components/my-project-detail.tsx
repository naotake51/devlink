import { Prisma, ProjectMemberRole } from "@/__generated__/prisma";
import {
  UserAvatar,
  profileSelectForUserAvatar,
} from "@/app/(protect)/_components/user-avater";
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
import { MyProjectOverview } from "./my-project-overview";
import { MyProjectSprintList } from "./my-project-sprint-list";
import { MyProjectSprintNoticeBadge } from "./my-project-sprint-notice-badge";

interface MyProjectDetailProps {
  projectId: string;
  tab: string;
}

export async function MyProjectDetail({
  projectId,
  tab,
}: MyProjectDetailProps) {
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
        <Tabs value={tab}>
          <TabsList>
            <TabsTrigger value="overview">
              <Link href={"?tab=overview"}>概要</Link>
            </TabsTrigger>
            <TabsTrigger value="members">
              <Link href={"?tab=members"}>メンバー</Link>
            </TabsTrigger>
            <TabsTrigger value="dev-point">
              <Link href={"?tab=dev-point"}>Dev Point</Link>
            </TabsTrigger>
            <TabsTrigger value="sprints">
              <Link href={"?tab=sprints"}>
                Sprint
                <MyProjectSprintNoticeBadge projectId={project.id} />
              </Link>
            </TabsTrigger>
            <TabsTrigger value="resolutions">
              <Link href={"?tab=resolutions"}>決議</Link>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Link href={"?tab=settings"}>設定</Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {tab === "overview" && (
              <MyProjectOverview content={project.description ?? ""} />
            )}
          </TabsContent>
          <TabsContent value="members">
            {tab === "members" && <MyProjectMemberList project={project} />}
          </TabsContent>
          <TabsContent value="dev-point">
            {tab === "dev-point" && <MyProjectDevPoint project={project} />}
          </TabsContent>
          <TabsContent value="sprints">
            {tab === "sprints" && <MyProjectSprintList project={project} />}
          </TabsContent>
          <TabsContent value="resolutions">
            {tab === "resolutions" && (
              <>
                決議（Protected）
                メンバー採用・メンバー解雇・プロジェクト方針決定など
              </>
            )}
          </TabsContent>
          <TabsContent value="settings">
            {tab === "settings" && <>設定（Protected） 削除機能など</>}
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
