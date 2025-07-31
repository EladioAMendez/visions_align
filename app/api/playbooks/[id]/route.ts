import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "@/libs/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const playbookId = params.id;

  try {
    // Check if the playbook exists and belongs to the user
    const playbook = await prisma.playbook.findFirst({
      where: {
        id: playbookId,
        userId: session.user.id,
      },
    });

    if (!playbook) {
      return NextResponse.json(
        { error: "Playbook not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the playbook
    await prisma.playbook.delete({
      where: { id: playbookId },
    });

    return NextResponse.json(
      { message: "Playbook deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting playbook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const playbookId = params.id;

  try {
    const playbook = await prisma.playbook.findFirst({
      where: {
        id: playbookId,
        userId: session.user.id,
      },
      include: {
        stakeholder: {
          select: {
            id: true,
            name: true,
            title: true,
            company: true,
            role: true,
            influence: true,
            relationship: true,
          },
        },
      },
    });

    if (!playbook) {
      return NextResponse.json(
        { error: "Playbook not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(playbook, { status: 200 });
  } catch (error) {
    console.error("Error fetching playbook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
