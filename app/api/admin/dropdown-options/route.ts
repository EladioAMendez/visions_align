import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "@/libs/prisma";

// Check if user is admin (you can customize this logic)
async function isAdmin(email: string): Promise<boolean> {
  // For now, we'll check if user exists and has access
  // You can add specific admin email checks or admin role field later
  const user = await prisma.user.findUnique({
    where: { email },
    select: { hasAccess: true, planTier: true }
  });
  
  // For now, PRO and DIRECTOR users can access admin panel
  return user?.hasAccess && (user.planTier === 'PRO' || user.planTier === 'DIRECTOR');
}

export async function GET(req: NextRequest) {
  try {
    const options = await prisma.dropdownOption.findMany({
      orderBy: [
        { category: 'asc' },
        { sortOrder: 'asc' },
      ],
    });

    return NextResponse.json({ success: true, options });

  } catch (error) {
    console.error("Error fetching admin dropdown options:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !(await isAdmin(session.user.email))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { category, value, label, description, sortOrder } = await req.json();

    // Validate required fields
    if (!category || !value || !label) {
      return NextResponse.json({ 
        error: "Category, value, and label are required" 
      }, { status: 400 });
    }

    // Check if category is valid
    if (!['influence', 'relationship'].includes(category)) {
      return NextResponse.json({ 
        error: "Category must be 'influence' or 'relationship'" 
      }, { status: 400 });
    }

    const newOption = await prisma.dropdownOption.create({
      data: {
        category,
        value: value.toUpperCase(),
        label,
        description: description || null,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json({ success: true, option: newOption }, { status: 201 });

  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: "A dropdown option with this category and value already exists" 
      }, { status: 409 });
    }
    console.error("Error creating dropdown option:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
