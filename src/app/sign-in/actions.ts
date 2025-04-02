"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { signInSchema } from "./schema";

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");

  const result = signInSchema.safeParse({
    email,
    password,
  });

  if (!result.success) {
    console.error("バリデーションエラー:", result.error.errors);
    redirect("/error");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    console.error("認証エラー:", error.message);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
