import prisma from "@/lib/prisma";
import { cache } from "react";
import "server-only";

export const getProfile = cache(async (userId: string) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      displayName: true,
      avatarUrl: true,
    },
  });

  return profile;
});
