import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "../../../libs/prisma";
import { Prisma } from "@/lib/generated/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const { stakeholderId } = await req.json();

    if (!stakeholderId) {
      return NextResponse.json(
        { error: "stakeholderId is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { playbookCredits: true },
    });

    if (!user || user.playbookCredits <= 0) {
      return NextResponse.json(
        { error: "Insufficient playbook credits" },
        { status: 402 } // 402 Payment Required
      );
    }

    // Use a transaction to ensure atomicity
    const playbook = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.user.update({
        where: { id: userId },
        data: { playbookCredits: { decrement: 1 } },
      });

      const newPlaybook = await tx.playbook.create({
        data: {
          userId,
          stakeholderId,
          status: "PENDING",
        },
      });

      return newPlaybook;
    });

    // Trigger n8n webhook
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playbookId: playbook.id }),
      });
    }

    return NextResponse.json(playbook, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
