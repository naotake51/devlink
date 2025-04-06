"use server";

import { createClient } from "@/utils/supabase/server";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NewProjectSchema } from "./schema";

const safeAction = createSafeActionClient();

export const createProject = safeAction
  .schema(NewProjectSchema)
  .action(async ({ parsedInput }) => {
    const data = parsedInput;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase.from("projects").insert({
      title: data.name,
      description: data.description,
      owner_id: user.id,
    });

    if (error) {
      console.error("Error creating project:", error);
      throw new Error("プロジェクトの作成に失敗しました");
    }

    revalidatePath("/my");
    redirect("/my");
  });
