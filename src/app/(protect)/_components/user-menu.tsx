import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import "server-only";
import { UserAvatar, profileSelectForUserAvatar } from "./user-avater";

interface UserMenuProps {
  userId: string;
}

export async function UserMenu({ userId }: UserMenuProps) {
  const profile = await getProfile(userId);

  if (!profile) {
    throw new Error("Profile not found");
  }

  async function handleLogout() {
    "use server";

    const supabase = await createClient();

    await supabase.auth.signOut();

    redirect("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="focus:outline-none">
          <UserAvatar profile={profile} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>アカウント</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my/profile">プロフィール</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/my/settings">設定</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

async function getProfile(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: {
      id: userId,
    },
    select: profileSelectForUserAvatar,
  });

  return profile;
}
