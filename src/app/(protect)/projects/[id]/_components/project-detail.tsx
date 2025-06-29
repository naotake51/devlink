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
import "server-only";
import { ProjectDevPoint } from "./project-dev-point";
import {
  ProjectMemberList,
  projectSelectForProjectMemberList,
} from "./project-member-list";

interface ProjectDetailProps {
  projectId: string;
}

export async function ProjectDetail({ projectId }: ProjectDetailProps) {
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
        <Button variant="outline" size="sm">
          応募
          <FilePenLineIcon />
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
        <Tabs defaultValue="service">
          <TabsList>
            <TabsTrigger value="service">サービス概要</TabsTrigger>
            <TabsTrigger value="tech-stack">技術スタック</TabsTrigger>
            <TabsTrigger value="members">メンバー</TabsTrigger>
            <TabsTrigger value="dev-point">Dev Point</TabsTrigger>
          </TabsList>
          <TabsContent value="service">
            <Markdown content={project.serviceDescription ?? ""} />
          </TabsContent>
          <TabsContent value="tech-stack">
            <Markdown content={project.techStackDescription ?? ""} />
          </TabsContent>
          <TabsContent value="members">
            <ProjectMemberList project={project} />
          </TabsContent>
          <TabsContent value="dev-point">
            <ProjectDevPoint project={project} />
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
        serviceDescription: true,
        techStackDescription: true,
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
      projectSelectForProjectMemberList,
    ),
  });

  return project;
}
