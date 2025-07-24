import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifyAuthUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return user;
});
