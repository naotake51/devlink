import { z } from "zod";

export const passwordResetRequestSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
});

export const passwordResetSchema = z
  .object({
    password: z.string().min(6, {
      message: "パスワードは6文字以上である必要があります。",
    }),
    confirmPassword: z.string().min(6, {
      message: "パスワードは6文字以上である必要があります。",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません。",
    path: ["confirmPassword"],
  });
