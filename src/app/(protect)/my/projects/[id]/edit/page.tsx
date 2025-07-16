import { ErrorMessage } from "@/components/error-message";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { EditProject } from "./_components/edit-project";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const EditMyProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

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
