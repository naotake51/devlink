import { getAuthUser } from "@/utils/data/auth";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  redirect(`/users/${user.id}`);
}
