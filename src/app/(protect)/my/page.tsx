import { UserIcon } from "lucide-react";
import { MyProjectCardList } from "./_components/my-project-card-list";

export default function MyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <UserIcon />
        マイページ
      </h1>
      <div className="space-y-4">
        <MyProjectCardList />
      </div>
    </div>
  );
}
