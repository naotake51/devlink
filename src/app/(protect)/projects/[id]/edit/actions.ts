"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { getAuthUser } from "@/utils/data/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EditProjectSchema } from "./schema";

export const updateProject = actionClient
  .schema(EditProjectSchema)
  .action(async ({ parsedInput }) => {
    const data = parsedInput;

    const user = await getAuthUser();
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
