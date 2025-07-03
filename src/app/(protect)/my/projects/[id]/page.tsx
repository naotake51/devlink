import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { z } from "zod";
import { MyProjectDetail } from "./_components/my-project-detail";

const searchParamsSchema = z.object({
  tab: z.enum([
    "overview",
    "members",
    "dev-point",
    "sprints",
    "thread",
    "resolutions",
    "settings",
  ]),
  thread: z.string().uuid().optional(),
});

/**
 * @private
 */
interface MyProjectDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function MyProjectDetailPage({
  params,
  searchParams,
}: MyProjectDetailPageProps) {
  const { id } = await params;

  const q = searchParamsSchema.safeParse(await searchParams);
  if (!q.success) {
    console.error("Invalid search parameters:", q.error);
    return <p className="text-red-500">Invalid parameters</p>;
  }

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
          tab={typeof q.data.tab === "string" ? q.data.tab : "overview"}
          thread={typeof q.data.thread === "string" ? q.data.thread : undefined}
        />
      </div>
    </div>
  );
}
