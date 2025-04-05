"use server";

import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/utils/supabase/server";
import "server-only";
import { signUpSchema } from "./schema";

/**
 * @package
 */
export const signup = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput;
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { failure: error.message };
    }

    return {
      success:
        "確認メールを送信しました。メール内のリンクから認証を完了してください。",
    };
  });
