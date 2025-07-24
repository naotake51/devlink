import { verifyAuthUser } from "@/utils/data/auth";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const user = await verifyAuthUser();

  redirect(`/users/${user.id}`);
}
