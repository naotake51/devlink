import { ErrorMessage } from "@/components/error-message";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { z } from "zod";
import { MyProjectDetail } from "./_components/my-project-detail";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const searchParamsSchema = z.object({
  tab: z
    .enum([
      "overview",
      "members",
      "dev-point",
      "sprints",
      "thread",
      "resolutions",
      "settings",
    ])
    .optional(),
  thread: z.string().uuid().optional(),
});

/**
 * @private
 */
interface MyProjectDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyProjectDetailPage({
  params,
  searchParams,
}: MyProjectDetailPageProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  const q = searchParamsSchema.safeParse(await searchParams);
  if (!q.success) {
    console.error("Invalid search parameters:", q.error);
    return <ErrorMessage code={400} />;
  }
  const { tab, thread } = q.data;

  return (
    <div>
      <Link href="/my">
        <p className="text-md font-bold mb-4 flex items-center gap-2">
          <ChevronLeftIcon />
          マイページへ戻る
        </p>
      </Link>
      <div className="space-y-4 flex-1">
        <MyProjectDetail
          projectId={id}
          tab={tab ?? "overview"}
          thread={thread ?? undefined}
        />
      </div>
    </div>
  );
}
