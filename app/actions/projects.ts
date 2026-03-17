"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type ProjectInput = {
  imageUrl: string;
  name: string;
  shortDescription: string;
  linkName: string;
  link: string;
  order?: number;
};

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function createProject(data: ProjectInput) {
  const project = await prisma.project.create({
    data: {
      ...data,
      order: data.order ?? 0,
    },
  });
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  return project;
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  const project = await prisma.project.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  return project;
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
}
