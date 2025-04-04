"use server";

import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import "server-only";
import { passwordResetRequestSchema, passwordResetSchema } from "./schema";

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
