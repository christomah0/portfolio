"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type ExperienceInput = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  order?: number;
};

export async function getExperiences() {
  return prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function createExperience(data: ExperienceInput) {
  const experience = await prisma.experience.create({
    data: {
      ...data,
      order: data.order ?? 0,
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/experiences");
  return experience;
}

export async function updateExperience(
  id: string,
  data: Partial<ExperienceInput>
) {
  const experience = await prisma.experience.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/experiences");
  return experience;
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/experiences");
}
