"use server";

import "server-only";
import { createClient } from "@/utils/supabase/server";
import { passwordResetRequestSchema, passwordResetSchema } from "./schema";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";

export const requestPasswordReset = actionClient
  .schema(passwordResetRequestSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/password-reset`,
    });

    if (error) {
      return { failure: error.message };
    }

    return {
      success:
        "パスワードリセット用のメールを送信しました。メール内のリンクからパスワードの再設定を行ってください。",
    };
  });

export const resetPassword = actionClient
  .schema(passwordResetSchema)
  .action(async ({ parsedInput }) => {
    const { password } = parsedInput;
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return { failure: error.message };
    }

    return redirect("/sign-in");
  });
