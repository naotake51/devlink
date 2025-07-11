"use server";

import { ProjectMemberRole } from "@/__generated__/prisma";
import prisma from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NewProjectSchema } from "./schema";

export const createProject = actionClient
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

    await prisma.$transaction(async (prisma) => {
      const createdProject = await prisma.project.create({
        data: {
          title: data.title,
          startDate: data.startDate,
          description: data.description,
        },
      });

      await prisma.projectMember.create({
        data: {
          projectId: createdProject.id,
          profileId: user.id,
          role: ProjectMemberRole.OWNER,
          devPoint: 0,
          initialDevPoint: 0,
        },
      });
    });

    revalidatePath("/my");
    redirect("/my");
  });
