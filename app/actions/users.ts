"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  username: string | null;
  createdAt: Date;
};

export async function getUsers(): Promise<UserInfo[]> {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function getUser(id: string): Promise<UserInfo | null> {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      createdAt: true,
    },
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  username: string;
  password: string;
}) {
  await auth.api.signUpEmail({
    body: {
      email: data.email,
      password: data.password,
      name: data.name,
      username: data.username,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/users");
}

export async function updateUser(
  id: string,
  data: {
    name?: string;
    email?: string;
    username?: string;
    password?: string;
  }
) {
  const { password, ...profileData } = data;

  if (Object.keys(profileData).length > 0) {
    await prisma.user.update({
      where: { id },
      data: profileData,
    });
  }

  if (password) {
    // Update password via the account record
    const bcrypt = await import("better-auth/crypto");
    const hashedPassword = await bcrypt.hashPassword(password);
    await prisma.account.updateMany({
      where: { userId: id, providerId: "credential" },
      data: { password: hashedPassword },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/users");
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/users");
}
