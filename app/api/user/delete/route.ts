import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "@/libs/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete user and all associated data (cascade delete)
    await prisma.user.delete({
      where: { email: session.user.email }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Account deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting user account:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
