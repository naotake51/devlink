import { Prisma, ProjectMemberRole } from "@/__generated__/prisma";
import {
  UserAvatar,
  profileSelectForUserAvatar,
} from "@/app/(protect)/_components/user-avater";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import merge from "lodash.merge";
import { FilePenLineIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { ProjectDevPoint } from "./project-dev-point";
import {
  ProjectMemberList,
  projectSelectForProjectMemberList,
} from "./project-member-list";
import { ProjectOverview } from "./project-overview";

interface ProjectDetailProps {
  projectId: string;
}

export async function ProjectDetail({ projectId }: ProjectDetailProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const project = await getProjectDetail(projectId);
  if (!project) {
    return <div>プロジェクトが見つかりません。</div>;
  }

  const owners = project.projectMembers.filter(
    (member) => member.role === ProjectMemberRole.OWNER,
  );

  const projectApplication = await getProjectApplication(projectId, user.id);

  return (
    <Card
      style={{
        viewTransitionName: `project-${projectId}`,
      }}
    >
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{project.title}</CardTitle>
        {projectApplication ? (
          <Badge variant="secondary" className="bg-blue-500 text-white text-md">
            応募中
          </Badge>
        ) : (
          <Link href={`/projects/${projectId}/application`}>
            <Button variant="outline" size="sm">
              応募
              <FilePenLineIcon />
            </Button>
          </Link>
        )}
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
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="members">メンバー</TabsTrigger>
            <TabsTrigger value="dev-point">Dev Point</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <ProjectOverview content={project.description ?? ""} />
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
      projectSelectForProjectMemberList,
    ),
  });

  return project;
}

async function getProjectApplication(projectId: string, profileId: string) {
  const application = await prisma.projectApplication.findUnique({
    where: {
      projectId_profileId: {
        projectId,
        profileId,
      },
    },
  });

  return application;
}
