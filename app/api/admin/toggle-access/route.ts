import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "@/libs/prisma";
import { isAdmin } from "@/middleware/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, hasAccess } = await req.json();

    if (!userId || typeof hasAccess !== 'boolean') {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Update user access in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        hasAccess,
        updatedAt: new Date(),
      },
    });

    // Log admin action for audit trail
    console.log(`Admin ${session.user.email} ${hasAccess ? 'granted' : 'revoked'} access for user ${updatedUser.email}`);

    return NextResponse.json({ 
      success: true, 
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        hasAccess: updatedUser.hasAccess,
      }
    });

  } catch (error) {
    console.error("Error toggling user access:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
