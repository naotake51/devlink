"use server";

import { ProjectMemberRole } from "@/__generated__/prisma";
import prisma from "@/lib/prisma";
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

    await prisma.$transaction(async (prisma) => {
      const createdProject = await prisma.project.create({
        data: {
          title: data.name,
          description: data.description,
        },
      });

      await prisma.projectMember.create({
        data: {
          projectId: createdProject.id,
          profileId: user.id,
          role: ProjectMemberRole.OWNER,
          devPoint: 0,
        },
      });
    });

    revalidatePath("/my");
    redirect("/my");
  });
