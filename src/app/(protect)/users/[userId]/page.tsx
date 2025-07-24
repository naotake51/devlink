import { ProjectCardList } from "@/app/(protect)/projects/_components/project-card-list";
import { ErrorMessage } from "@/components/error-message";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProfileWithProjects } from "@/utils/data/profile";
import { FilePenLineIcon } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { UserAvatar } from "../../_components/user-avatar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    return {
      title: "無効なユーザー",
      description: `ユーザーIDが正しくありません。`,
    };
  }
  const { userId } = p.data;

  const profile = await getProfileWithProjects(userId);
  if (!profile) {
    return {
      title: "無効なユーザー",
      description: `指定されたユーザーは存在しません。`,
    };
  }

  return {
    title: `${profile.displayName}のプロフィール`,
    description: `DevLinkユーザー ${profile.displayName}のプロフィールページです。`,
  };
}

const paramsSchema = z.object({
  userId: z.string().uuid(),
});

interface ProjectDetailPageProps {
  params: Promise<{ userId: string }>;
}

/**
 * @private
 */
export default async function UserPage({ params }: ProjectDetailPageProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { userId } = p.data;

  const profile = await getProfileWithProjects(userId);
  if (!profile) {
    return <ErrorMessage code={404} />;
  }

  const projects = profile.projectMembers.map((member) => member.project);

  return (
    <div className="space-y-8">
      <div className="flex gap-12">
        <UserAvatar
          profile={profile}
          className="size-48 text-9xl bg-white border-2"
        />
        <div>
          <p className="text-2xl">{profile.displayName}</p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">参加しているプロジェクト</h2>
          <Button variant="outline" asChild>
            <Link href="/projects/new">
              新しいプロジェクト
              <FilePenLineIcon />
            </Link>
          </Button>
        </div>
        <Separator className="my-2" />
        <ProjectCardList projects={projects} />
      </div>
    </div>
  );
}
