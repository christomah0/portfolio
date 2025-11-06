import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from '@/app/generated/prisma/client';

const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
  // Paths that don't require authentication
  const publicPaths = ["/admin", "/", "/forgot-password", "/reset-password"];
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // Check if we're on a public path
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get session token from cookie
  const sessionToken = request.cookies.get("session")?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    // Verify session
    const session = await prisma.session.findFirst({
      where: {
        token: sessionToken,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Update session lastAccessedAt
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    // Continue to the protected route
    return NextResponse.next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}

// Configure which paths require authentication
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api/auth/** (authentication endpoints)
     * - /login, /register, /forgot-password, /reset-password
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /favicon.ico, /robots.txt (public files)
     */
    "/((?!api/auth|admin|forgot-password|reset-password|_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};