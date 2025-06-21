import { today } from "@/lib/date-utils";
import { addDays, subDays } from "date-fns";
import { Prisma, PrismaClient } from "../src/__generated__/prisma";

const prisma = new PrismaClient();

const baseDate = subDays(today(), 14 * 2);

const profileData: Prisma.ProfileCreateInput[] = [
  {
    id: "7214c07b-0d6a-469b-8b0a-c1bac2d22ddd",
    displayName: "Alice",
    avatarUrl: null,
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    displayName: "Bob",
    avatarUrl: null,
  },
];

const projectData: Prisma.ProjectCreateInput[] = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    title: "Project A",
    description: "Description of Project A",
    startDate: baseDate,
    projectMembers: {
      create: [
        {
          profile: {
            connect: { id: "7214c07b-0d6a-469b-8b0a-c1bac2d22ddd" },
          },
          role: "OWNER",
          devPoint: 0,
          initialDevPoint: 0,
        },
        {
          profile: {
            connect: { id: "00000000-0000-0000-0000-000000000001" },
          },
          role: "MEMBER",
          devPoint: 0,
          initialDevPoint: 0,
        },
      ],
    },
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    title: "Project B",
    description: "Description of Project B",
    startDate: baseDate,
  },
];

const sprintData: Prisma.SprintCreateInput[] = [
  {
    project: {
      connect: { id: "00000000-0000-0000-0000-000000000000" },
    },
    sprintNumber: 1,
    startDate: addDays(baseDate, 14 * 0),
    endDate: addDays(baseDate, 14 * 1 - 1),
    voteStartDate: addDays(baseDate, 14 * 1),
    voteEndDate: addDays(baseDate, 14 * 1 + 7),
  },
  {
    project: {
      connect: { id: "00000000-0000-0000-0000-000000000000" },
    },
    sprintNumber: 2,
    startDate: addDays(baseDate, 14 * 1),
    endDate: addDays(baseDate, 14 * 2 - 1),
    voteStartDate: addDays(baseDate, 14 * 2),
    voteEndDate: addDays(baseDate, 14 * 2 + 7),
  },
];

export async function main() {
  for (const data of profileData) {
    await prisma.profile.create({ data });
  }

  for (const data of projectData) {
    await prisma.project.create({ data });
  }

  for (const data of sprintData) {
    await prisma.sprint.create({ data });
  }
}

main();
