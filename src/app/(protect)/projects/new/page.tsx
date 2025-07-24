import { ChevronLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { NewProjectForm } from "./_components/new-project-form";

/**
 * @private
 */
export const metadata: Metadata = {
  title: "新規プロジェクト作成",
  description: "新しいプロジェクトを作成して、他のユーザーを募集しましょう。",
};

const NewProjectPage = () => {
  return (
    <div>
      <Link href="/">
        <p className="text-md font-bold mb-4 flex items-center gap-2">
          <ChevronLeftIcon />
          マイページへ戻る
        </p>
      </Link>
      <div className="space-y-4 flex-1">
        <NewProjectForm />
      </div>
    </div>
  );
};

export default NewProjectPage;
