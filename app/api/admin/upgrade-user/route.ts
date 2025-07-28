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

    const { userId, planTier, hasAccess } = await req.json();

    if (!userId || !planTier) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate plan tier
    const validTiers = ['STARTER', 'PRO', 'DIRECTOR'];
    if (!validTiers.includes(planTier)) {
      return NextResponse.json({ error: "Invalid plan tier" }, { status: 400 });
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        planTier,
        hasAccess: hasAccess ?? true,
        updatedAt: new Date(),
      },
    });

    // Log admin action for audit trail
    console.log(`Admin ${session.user.email} upgraded user ${updatedUser.email} to ${planTier}`);

    return NextResponse.json({ 
      success: true, 
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        planTier: updatedUser.planTier,
        hasAccess: updatedUser.hasAccess,
      }
    });

  } catch (error) {
    console.error("Error upgrading user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
