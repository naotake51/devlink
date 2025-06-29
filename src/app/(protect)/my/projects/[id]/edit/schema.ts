import { z } from "zod";

export const EditProjectSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: "タイトルは必須です" })
    .max(255, { message: "タイトルは255文字以内です" }),
  startDate: z.date(),
  serviceDescription: z
    .string()
    .max(4096, { message: "サービス概要は4096文字以内です" }),
  techStackDescription: z
    .string()
    .max(4096, { message: "技術スタックは4096文字以内です" }),
});

export type EditProjectInput = z.infer<typeof EditProjectSchema>;
