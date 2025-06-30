import { z } from "zod";

export const EditProjectSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: "タイトルは必須です" })
    .max(255, { message: "タイトルは255文字以内です" }),
  startDate: z.date(),
  description: z.string().max(4096, { message: "説明は4096文字以内です" }),
});

export type EditProjectInput = z.infer<typeof EditProjectSchema>;
