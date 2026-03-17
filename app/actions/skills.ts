"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type SkillInput = {
  title: string;
  description: string;
  order?: number;
};

export async function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: "asc" } });
}

export async function createSkill(data: SkillInput) {
  const skill = await prisma.skill.create({
    data: {
      ...data,
      order: data.order ?? 0,
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/skills");
  return skill;
}

export async function updateSkill(id: string, data: Partial<SkillInput>) {
  const skill = await prisma.skill.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/skills");
  return skill;
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/skills");
}
