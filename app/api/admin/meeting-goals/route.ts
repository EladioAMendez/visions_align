import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

// GET - Fetch all meeting goals (including inactive ones for admin)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Basic admin check - you can enhance this with proper role-based access
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const meetingGoals = await prisma.meetingGoalOption.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json(meetingGoals, { status: 200 });
  } catch (error) {
    console.error('Error fetching meeting goals for admin:', error);
    return NextResponse.json(
      { error: "Failed to fetch meeting goals" },
      { status: 500 }
    );
  }
}

// POST - Create new meeting goal
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { value, label, description, sortOrder = 0, isActive = true } = body;

    if (!value || !label || !description) {
      return NextResponse.json(
        { error: "Value, label, and description are required" },
        { status: 400 }
      );
    }

    const meetingGoal = await prisma.meetingGoalOption.create({
      data: {
        value: value.toUpperCase().replace(/\s+/g, '_'),
        label,
        description,
        sortOrder,
        isActive,
      },
    });

    return NextResponse.json(meetingGoal, { status: 201 });
  } catch (error) {
    console.error('Error creating meeting goal:', error);
    return NextResponse.json(
      { error: "Failed to create meeting goal" },
      { status: 500 }
    );
  }
}

// PUT - Update existing meeting goal
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, value, label, description, sortOrder, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const meetingGoal = await prisma.meetingGoalOption.update({
      where: { id },
      data: {
        ...(value && { value: value.toUpperCase().replace(/\s+/g, '_') }),
        ...(label && { label }),
        ...(description && { description }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(meetingGoal, { status: 200 });
  } catch (error) {
    console.error('Error updating meeting goal:', error);
    return NextResponse.json(
      { error: "Failed to update meeting goal" },
      { status: 500 }
    );
  }
}

// DELETE - Delete meeting goal
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.meetingGoalOption.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Meeting goal deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error deleting meeting goal:', error);
    return NextResponse.json(
      { error: "Failed to delete meeting goal" },
      { status: 500 }
    );
  }
}
