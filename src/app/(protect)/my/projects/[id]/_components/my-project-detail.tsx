import { UserAvatar } from "@/app/(protect)/_components/user-avater";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { FilePenLineIcon } from "lucide-react";
import Link from "next/link";
import "server-only";

const PROJECT_DETAIL_FIELDS = `
  id,
  owner_id,
  title,
  description,
  created_at,
  profile:profiles (
    id,
    display_name,
    avatar_url
  )
`;

type ProjectDetailProps = {
  projectId: string;
};

export async function MyProjectDetail({ projectId }: ProjectDetailProps) {
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select(PROJECT_DETAIL_FIELDS)
    .eq("id", projectId)
    .single();

  if (!project) {
    return <div>プロジェクトが見つかりません。</div>;
  }

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
        <div className="flex items-center gap-2">
          <UserAvatar profileId={project.owner_id} />
          <p className="text-md text-muted-foreground">
            {project.profile?.display_name}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date(project.created_at).toLocaleString()}
        </p>
        <div>{project.description ?? ""}</div>
      </CardContent>
    </Card>
  );
}
