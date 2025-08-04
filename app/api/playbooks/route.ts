import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "../../../libs/prisma";
import { Prisma } from "@/lib/generated/prisma";
import { aiConfig } from "@/libs/config";

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
      select: { 
        playbookCredits: true, 
        planTier: true, 
        linkedinUrl: true 
      },
    });

    if (!user || user.playbookCredits <= 0) {
      return NextResponse.json(
        { error: "Insufficient playbook credits" },
        { status: 402 } // 402 Payment Required
      );
    }

    // For Director tier users, LinkedIn profile is required for relationship analysis
    if (user.planTier === 'DIRECTOR' && !user.linkedinUrl) {
      return NextResponse.json(
        { 
          error: "LinkedIn profile required",
          message: "Director tier users need to add their LinkedIn profile to generate Relationship Playbooks. Please update your profile in Account Settings.",
          requiresLinkedIn: true
        },
        { status: 400 }
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

    // Trigger n8n webhook with comprehensive data
    const n8nWebhookUrl = aiConfig.n8n.webhookUrl;
    if (n8nWebhookUrl) {
      // Fetch user data for webhook
      const userData = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          planTier: true,
          linkedinUrl: true,
        },
      });

      // Fetch stakeholder data for webhook
      const stakeholderData = await prisma.stakeholder.findUnique({
        where: { id: stakeholderId },
        select: {
          id: true,
          name: true,
          title: true,
          company: true,
          role: true,
          department: true,
          influence: true,
          relationship: true,
          notes: true,
          linkedinUrl: true,
        },
      });

      const webhookPayload = {
        playbookId: playbook.id,
        user: userData,
        stakeholder: stakeholderData,
        playbookType: userData?.planTier === 'DIRECTOR' ? 'RELATIONSHIP' : 'STAKEHOLDER',
        aiPersonas: {
          // Core 6 AI personas available to all tiers
          strategist: true,
          empath: true,
          operator: true,
          analyst: true,
          communicator: true,
          negotiator: true,
          // The Connector - exclusive to Director tier
          connector: userData?.planTier === 'DIRECTOR' && userData?.linkedinUrl ? true : false
        },
        analysisScope: {
          stakeholderOnly: userData?.planTier !== 'DIRECTOR',
          relationshipAnalysis: userData?.planTier === 'DIRECTOR' && userData?.linkedinUrl,
          userProfileRequired: userData?.planTier === 'DIRECTOR'
        }
      };

      await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
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
