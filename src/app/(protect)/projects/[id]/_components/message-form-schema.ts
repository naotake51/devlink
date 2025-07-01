import { z } from "zod";

export const messageFormSchema = z.object({
  message: z
    .string()
    .min(1, { message: "メッセージは必須です" })
    .max(4096, { message: "メッセージは4096文字以内です" }),
});

export type MessageFormInput = z.infer<typeof messageFormSchema>;
