import { z } from "zod";

/**
 * @package
 */
export const signUpSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
  password: z.string().min(6, {
    message: "パスワードは6文字以上である必要があります。",
  }),
});
