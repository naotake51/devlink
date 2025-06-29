import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { EditProject } from "./_components/edit-project";

const EditMyProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <Link href={`/my/projects/${id}`}>
        <p className="text-md font-bold mb-4 flex items-center gap-2">
          <ChevronLeftIcon />
          プロジェクト詳細へ戻る
        </p>
      </Link>
      <div className="space-y-4 flex-1">
        <EditProject projectId={id} />
      </div>
    </div>
  );
};

export default EditMyProjectPage;
