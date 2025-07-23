import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { NewProjectForm } from "./_components/new-project-form";

const NewProjectPage = () => {
  return (
    <div>
      <Link href="/my">
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
