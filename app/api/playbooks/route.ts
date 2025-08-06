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
    const { stakeholderId, playbookType, meetingGoal } = await req.json();

    if (!stakeholderId) {
      return NextResponse.json(
        { error: "stakeholderId is required" },
        { status: 400 }
      );
    }

    // Validate playbook type and meeting goal
    const validPlaybookTypes = ['STAKEHOLDER_ANALYSIS', 'GOAL_ORIENTED', 'RELATIONSHIP_ANALYSIS'];
    const validMeetingGoals = ['PROJECT_UPDATE', 'BUDGET_ASK', 'NEW_IDEA_PITCH', 'PERFORMANCE_REVIEW', 'STRATEGIC_ALIGNMENT', 'PROBLEM_SOLVING', 'STAKEHOLDER_ALIGNMENT'];
    
    if (playbookType && !validPlaybookTypes.includes(playbookType)) {
      return NextResponse.json(
        { error: "Invalid playbook type" },
        { status: 400 }
      );
    }

    if (playbookType === 'GOAL_ORIENTED' && (!meetingGoal || !validMeetingGoals.includes(meetingGoal))) {
      return NextResponse.json(
        { error: "Meeting goal is required for Goal-Oriented Playbooks" },
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

    // Determine playbook type based on user tier and request
    let finalPlaybookType = playbookType || 'STAKEHOLDER_ANALYSIS';
    
    // Tier-based playbook type validation
    if (user.planTier === 'STARTER' && finalPlaybookType !== 'STAKEHOLDER_ANALYSIS') {
      finalPlaybookType = 'STAKEHOLDER_ANALYSIS'; // Starter tier only gets basic analysis
    }
    
    if (user.planTier === 'PRO' && finalPlaybookType === 'RELATIONSHIP_ANALYSIS') {
      return NextResponse.json(
        { 
          error: "Upgrade required",
          message: "Relationship Analysis with The Connector is available for Director tier users only.",
          upgradeRequired: true
        },
        { status: 402 }
      );
    }

    // For Director tier users requesting relationship analysis, LinkedIn profile is required
    if (user.planTier === 'DIRECTOR' && finalPlaybookType === 'RELATIONSHIP_ANALYSIS' && !user.linkedinUrl) {
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
          playbookType: finalPlaybookType,
          meetingGoal: finalPlaybookType === 'GOAL_ORIENTED' ? meetingGoal : null,
        },
      });

      return newPlaybook;
    });

    // Trigger n8n webhook with comprehensive data
    const n8nWebhookUrl = aiConfig.n8n.webhookUrl;
    console.log('🔗 n8n Webhook URL:', n8nWebhookUrl ? 'SET' : 'NOT SET');
    
    if (n8nWebhookUrl) {
      try {
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
          playbookType: finalPlaybookType,
          meetingGoal: finalPlaybookType === 'GOAL_ORIENTED' ? meetingGoal : null,
          aiPersonas: {
            // Core 6 AI personas for all playbook types (The Insight Panel)
            strategist: true,
            psychologist: true,
            diplomat: true,
            dataAnalyst: true,
            executiveCoach: true,
            communicationsExpert: true,
            // The Agenda Coach - for Goal-Oriented Playbooks (Pro tier retention feature)
            agendaCoach: finalPlaybookType === 'GOAL_ORIENTED',
            // The Connector - 7th persona for Relationship Analysis (Director tier)
            connector: finalPlaybookType === 'RELATIONSHIP_ANALYSIS' && userData?.linkedinUrl ? true : false
          },
          analysisScope: {
            contentMastery: finalPlaybookType === 'STAKEHOLDER_ANALYSIS' || finalPlaybookType === 'GOAL_ORIENTED',
            contextMastery: finalPlaybookType === 'RELATIONSHIP_ANALYSIS',
            meetingSpecific: finalPlaybookType === 'GOAL_ORIENTED',
            relationshipAnalysis: finalPlaybookType === 'RELATIONSHIP_ANALYSIS' && userData?.linkedinUrl,
            userProfileRequired: finalPlaybookType === 'RELATIONSHIP_ANALYSIS'
          },
          brandPositioning: {
            tierFocus: userData?.planTier === 'PRO' ? 'Tactical Mastery - Master the content of communication' : 
                      userData?.planTier === 'DIRECTOR' ? 'Relational Mastery - Master the context and connection' : 
                      'Prove ROI on your most urgent stakeholder challenge',
            valueProposition: finalPlaybookType === 'GOAL_ORIENTED' ? 'Win the Meeting' : 
                             finalPlaybookType === 'RELATIONSHIP_ANALYSIS' ? 'Win the Promotion' : 
                             'Decode stakeholder psychology'
          }
        };

        console.log('📤 Sending webhook to n8n:', {
          url: n8nWebhookUrl,
          playbookId: playbook.id,
          playbookType: finalPlaybookType,
          meetingGoal: finalPlaybookType === 'GOAL_ORIENTED' ? meetingGoal : null,
          userTier: userData?.planTier
        });

        const webhookResponse = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
        });

        if (webhookResponse.ok) {
          console.log('✅ Webhook sent successfully to n8n');
        } else {
          console.error('❌ Webhook failed:', {
            status: webhookResponse.status,
            statusText: webhookResponse.statusText,
            url: n8nWebhookUrl
          });
        }
      } catch (webhookError) {
        console.error('❌ Webhook error:', webhookError);
        // Don't fail the entire request if webhook fails
      }
    } else {
      console.warn('⚠️ N8N_WEBHOOK_URL not configured - skipping webhook');
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
