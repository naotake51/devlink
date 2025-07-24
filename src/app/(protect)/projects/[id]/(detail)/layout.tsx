import { ProjectMemberRole } from "@/__generated__/prisma";
import { UserAvatar } from "@/app/(protect)/_components/user-avatar";
import { ErrorMessage } from "@/components/error-message";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyAuthUser } from "@/utils/data/auth";
import {
  getProject,
  getProjectApplication,
  getProjectMember,
  getProjectMembers,
} from "@/utils/data/project";
import Link from "next/link";
import "server-only";
import { z } from "zod";
import { ProjectApplicationModal } from "./_components/project-application-modal";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    return {
      title: "無効なプロジェクト",
      description: `プロジェクトIDが正しくありません。`,
    };
  }
  const { id } = p.data;

  const project = await getProject(id);
  if (!project) {
    return {
      title: "無効なプロジェクト",
      description: `指定されたプロジェクトは存在しません。`,
    };
  }

  return {
    title: `${project.title}`,
    description: `DevLinkプロジェクト ${project.title}の詳細ページです。`,
  };
}

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

  const user = await verifyAuthUser();

  const [project, projectMembers, projectMember, projectApplication] =
    await Promise.all([
      getProject(id),
      getProjectMembers(id),
      getProjectMember(id, user.id),
      getProjectApplication(id, user.id),
    ]);

  if (!project) {
    return <ErrorMessage code={404} />;
  }

  const owners = projectMembers.filter(
    (member) => member.role === ProjectMemberRole.OWNER,
  );

  return (
    <div>
      <div className="space-y-4 flex-1">
        <Card
          style={{
            viewTransitionName: `project-${id}`,
          }}
        >
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{project.title}</CardTitle>
            <div className="flex items-center gap-2">
              {projectMember?.role === "OWNER" && (
                <Button variant="outline" asChild>
                  <Link href={`/projects/${project.id}/edit`}>編集</Link>
                </Button>
              )}
              {!projectMember &&
                (projectApplication ? (
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white text-md"
                  >
                    応募中
                  </Badge>
                ) : (
                  <ProjectApplicationModal project={project} />
                ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {owners.map((owner) => (
                <div className="flex items-center gap-2" key={owner.profile.id}>
                  <UserAvatar profile={owner.profile} hasLink />
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
