import { z } from "zod";

export const ProjectApplicationSchema = z.object({
  message: z
    .string()
    .min(1, { message: "メッセージは必須です" })
    .max(4096, { message: "メッセージは4096文字以内です" }),
});

export type ProjectApplicationInput = z.infer<typeof ProjectApplicationSchema>;
