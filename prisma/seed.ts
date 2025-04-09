import { Prisma, PrismaClient } from "../src/__generated__/prisma";

const prisma = new PrismaClient();

const profileData: Prisma.ProfileCreateInput[] = [
  {
    displayName: "Alice",
    avatarUrl: null,
  },
  {
    displayName: "Bob",
    avatarUrl: null,
  },
];

const projectData: Prisma.ProjectCreateInput[] = [
  {
    title: "Project A",
    description: "Description of Project A",
  },
  {
    title: "Project B",
    description: "Description of Project B",
  },
];

export async function main() {
  for (const data of profileData) {
    await prisma.profile.create({ data });
  }

  for (const data of projectData) {
    await prisma.project.create({ data });
  }
}

main();
