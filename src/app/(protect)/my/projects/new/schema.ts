import { today } from "@/lib/date-utils";
import { z } from "zod";

export const NewProjectSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルは必須です" })
    .max(255, { message: "タイトルは255文字以内です" }),
  startDate: z.date().min(today(), {
    message: "開始日は今日以降の日付を指定してください",
  }),
  description: z.string().max(4096, { message: "は4096文字以内です" }),
});

export type NewProjectInput = z.infer<typeof NewProjectSchema>;
