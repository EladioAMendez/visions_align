import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/adminAuth";
import { prisma } from "@/libs/prisma";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const { userId, creditsToAdd } = await req.json();

    if (!userId || typeof creditsToAdd !== 'number') {
      return NextResponse.json(
        { error: "userId and creditsToAdd are required" },
        { status: 400 }
      );
    }

    // Get current user to check existing credits
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { playbookCredits: true, name: true, email: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update user credits
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        playbookCredits: {
          increment: creditsToAdd
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        playbookCredits: true
      }
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: `Added ${creditsToAdd} credits to ${user.name || user.email}`
    });

  } catch (error) {
    console.error("Error updating user credits:", error);
    return NextResponse.json(
      { error: "Failed to update user credits" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();

    const { userId, newCredits } = await req.json();

    if (!userId || typeof newCredits !== 'number') {
      return NextResponse.json(
        { error: "userId and newCredits are required" },
        { status: 400 }
      );
    }

    // Get current user info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Set user credits to exact amount
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        playbookCredits: newCredits
      },
      select: {
        id: true,
        name: true,
        email: true,
        playbookCredits: true
      }
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: `Set credits to ${newCredits} for ${user.name || user.email}`
    });

  } catch (error) {
    console.error("Error setting user credits:", error);
    return NextResponse.json(
      { error: "Failed to set user credits" },
      { status: 500 }
    );
  }
}
