"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { verifyAuthUser } from "@/utils/data/auth";
import { redirect } from "next/navigation";
import { EditProjectSchema } from "./schema";

export const updateProject = actionClient
  .schema(EditProjectSchema)
  .action(async ({ parsedInput }) => {
    const data = parsedInput;

    await verifyAuthUser();

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

    redirect(`/projects/${data.id}/overview`);
  });
