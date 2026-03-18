"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
  let settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: { id: "default", photoUrl: "/my-photo.png" },
    });
  }

  return settings;
}

export async function updatePhotoUrl(photoUrl: string) {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: { photoUrl },
    create: { id: "default", photoUrl },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
}
