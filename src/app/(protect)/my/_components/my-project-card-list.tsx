import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { FilePenLineIcon } from "lucide-react";
import Link from "next/link";
import { MY_PROJECT_CARD_FIELDS, MyProjectCard } from "./my-project-card";

export async function MyProjectCardList() {
  const projects = await getMyProjects();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">作成したプロジェクト</h2>
        <Button
          variant="outline"
          asChild
          style={{
            viewTransitionName: `new-project`,
          }}
        >
          <Link href="/my/projects/new">
            新しいプロジェクト
            <FilePenLineIcon />
          </Link>
        </Button>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <MyProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

async function getMyProjects() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("認証ユーザーの取得に失敗しました");
  }

  const queryBuilder = supabase
    .from("projects")
    .select(MY_PROJECT_CARD_FIELDS)
    .eq("owner_id", user.id);

  const { data: projects, error } = await queryBuilder;

  if (error) {
    throw error;
  }

  return projects;
}
