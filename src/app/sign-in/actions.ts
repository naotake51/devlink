"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signInSchema } from "./schema";
import { actionClient } from "@/lib/safe-action";

export const signIn = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { failure: error.message };
    }

    revalidatePath("/", "layout");
    redirect("/");
  });
