import prisma from "@/lib/prisma";
import { cache } from "react";
import "server-only";

export const getSprints = cache(async (projectId: string) => {
  const sprint = await prisma.sprint.findMany({
    where: {
      projectId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      sprintNumber: true,
      voteStartDate: true,
      voteEndDate: true,
      sprintVotes: {
        select: {
          id: true,
          member: {
            select: {
              profileId: true,
            },
          },
        },
      },
      sprintDividend: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      sprintNumber: "desc",
    },
  });

  return sprint;
});
