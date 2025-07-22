"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EditProjectSchema } from "./schema";

export const updateProject = actionClient
  .schema(EditProjectSchema)
  .action(async ({ parsedInput }) => {
    const data = parsedInput;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.project.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          startDate: data.startDate,
          description: data.description,
        },
      });
    });

    const path = `/projects/${data.id}/overview`;
    revalidatePath(path);
    redirect(path);
  });
