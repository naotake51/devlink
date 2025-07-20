import { Prisma, ProjectMemberRole } from "@/__generated__/prisma";
import {
  UserAvatar,
  profileSelectForUserAvatar,
} from "@/app/(protect)/_components/user-avater";
import { ErrorMessage } from "@/components/error-message";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import merge from "lodash.merge";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { z } from "zod";
import { ProjectApplicationModal } from "./_components/project-application-modal";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
  tabs: React.ReactNode;
}

/**
 * @private
 */
export default async function ProjectDetailLayout({
  params,
  tabs,
}: ProjectDetailPageProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const project = await getProject(id);
  if (!project) {
    return <ErrorMessage code={404} />;
  }

  const owners = project.projectMembers.filter(
    (member) => member.role === ProjectMemberRole.OWNER,
  );

  const projectApplication = await getProjectApplication(id, user.id);

  return (
    <div>
      <Link href="/projects">
        <p className="text-md font-bold mb-4 flex items-center gap-2">
          <ChevronLeftIcon />
          プロジェクト一覧へ戻る
        </p>
      </Link>
      <div className="space-y-4 flex-1">
        <Card
          style={{
            viewTransitionName: `project-${id}`,
          }}
        >
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{project.title}</CardTitle>
            {projectApplication ? (
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white text-md"
              >
                応募中
              </Badge>
            ) : (
              <ProjectApplicationModal project={project} />
            )}
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
