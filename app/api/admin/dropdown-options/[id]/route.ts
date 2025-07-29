import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "@/libs/prisma";

// Check if user is admin (same logic as parent route)
async function isAdmin(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { hasAccess: true, planTier: true }
  });
  
  return user?.hasAccess && (user.planTier === 'PRO' || user.planTier === 'DIRECTOR');
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !(await isAdmin(session.user.email))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { value, label, description, sortOrder, isActive } = await req.json();

    // Build update data object
    const updateData: any = {};
    if (value !== undefined) updateData.value = value.toUpperCase();
    if (label !== undefined) updateData.label = label;
    if (description !== undefined) updateData.description = description;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedOption = await prisma.dropdownOption.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, option: updatedOption });

  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Dropdown option not found" }, { status: 404 });
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        error: "A dropdown option with this category and value already exists" 
      }, { status: 409 });
    }
    console.error("Error updating dropdown option:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !(await isAdmin(session.user.email))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Check if this option is being used by any stakeholders
    const stakeholdersUsingOption = await prisma.stakeholder.findFirst({
      where: {
        OR: [
          { influence: { in: await getOptionValue(id) } },
          { relationship: { in: await getOptionValue(id) } }
        ]
      }
    });

    if (stakeholdersUsingOption) {
      return NextResponse.json({ 
        error: "Cannot delete option that is currently being used by stakeholders. Deactivate it instead." 
      }, { status: 409 });
    }

    await prisma.dropdownOption.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Dropdown option deleted successfully" });

  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Dropdown option not found" }, { status: 404 });
    }
    console.error("Error deleting dropdown option:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Helper function to get option value by ID
async function getOptionValue(id: string): Promise<string[]> {
  const option = await prisma.dropdownOption.findUnique({
    where: { id },
    select: { value: true }
  });
  return option ? [option.value] : [];
}
