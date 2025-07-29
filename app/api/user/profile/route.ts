import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "@/libs/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, linkedinUrl } = await req.json();

    // Validate inputs
    if (name !== undefined && (!name || typeof name !== 'string' || !name.trim())) {
      return NextResponse.json({ error: "Name must be a non-empty string" }, { status: 400 });
    }

    if (linkedinUrl !== undefined && linkedinUrl !== null && typeof linkedinUrl !== 'string') {
      return NextResponse.json({ error: "LinkedIn URL must be a string" }, { status: 400 });
    }

    // Build update data object
    const updateData: any = { updatedAt: new Date() };
    if (name !== undefined) updateData.name = name.trim();
    if (linkedinUrl !== undefined) updateData.linkedinUrl = linkedinUrl?.trim() || null;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        linkedinUrl: true,
      }
    });

    return NextResponse.json({ 
      success: true, 
      user: updatedUser
    });

  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
