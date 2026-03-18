import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const path = typeof body.path === "string" ? body.path : "/";

    await prisma.pageView.create({
      data: {
        path,
        referrer: request.headers.get("referer") ?? null,
        userAgent: request.headers.get("user-agent") ?? null,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
