import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

/**
 * @private
 */
export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/sign-in");
  }

  return <p>Hello {data.user.email}</p>;
}
