import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const baseURL = (process.env.BETTER_AUTH_URL || process.env.URL || "http://localhost:3000").replace(/\/+$/, "");

const trustedOrigins = [
  baseURL,
  ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",").map(o => o.trim().replace(/\/+$/, "")) || []),
];

export const auth = betterAuth({
  baseURL,
  trustedOrigins,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [
    username(),
    nextCookies()
  ]
});
