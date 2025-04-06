import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";
import "server-only";
import { UserMenu } from "./user-menu";

export interface AppHeaderProps {
  children?: ReactNode;
}

export async function AppHeader({ children }: AppHeaderProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <header className="py-4 px-4 border-b">
      <div className="mx-auto flex justify-between items-center">
        <div>{children}</div>
        <UserMenu userId={user.id} />
      </div>
    </header>
  );
}
