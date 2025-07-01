import prisma from "@/lib/prisma";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { ProjectApplicationForm } from "./_components/project-application-form";

interface ApplicationPageProps {
  params: {
    id: string;
  };
}

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  const { id } = params;

  // NOTE: メッセージテンプレートを取得する必要が出てくるかも
  const project = await prisma.project.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
    },
  });

  if (!project) {
    return <div>プロジェクトが見つかりません。</div>;
  }

  return (
    <div>
      <Link href={`/projects/${id}`}>
        <p className="text-md font-bold mb-4 flex items-center gap-2">
          <ChevronLeftIcon />
          プロジェクトに戻る
        </p>
      </Link>
      <div className="space-y-4 flex-1">
        <ProjectApplicationForm project={project} />
      </div>
    </div>
  );
}
