import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import "server-only";
import { MyProjectDetail } from "./_components/my-project-detail";

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
  const { tab } = await searchParams;

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
          tab={typeof tab === "string" ? tab : "overview"}
        />
      </div>
    </div>
  );
}
