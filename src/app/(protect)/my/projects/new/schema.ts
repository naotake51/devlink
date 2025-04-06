import { z } from "zod";

export const NewProjectSchema = z.object({
  name: z
    .string()
    .min(1, { message: "タイトルは必須です" })
    .max(255, { message: "タイトルは255文字以内です" }),
  description: z
    .string()
    .max(4096, { message: "説明は4096文字以内です" })
    .optional(),
});

export type NewProjectInput = z.infer<typeof NewProjectSchema>;
