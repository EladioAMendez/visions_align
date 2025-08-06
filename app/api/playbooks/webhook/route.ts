import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

// Helper functions for enhanced logging
function getPlaybookTypeLabel(playbookType: string): string {
  const labels: Record<string, string> = {
    STAKEHOLDER_ANALYSIS: 'Stakeholder Analysis',
    GOAL_ORIENTED: 'Goal-Oriented Playbook',
    RELATIONSHIP_ANALYSIS: 'Relationship Analysis'
  };
  return labels[playbookType] || playbookType;
}

function getMeetingGoalLabel(meetingGoal: string): string {
  const labels: Record<string, string> = {
    PROJECT_UPDATE: 'Project Update',
    BUDGET_ASK: 'Budget Ask',
    NEW_IDEA_PITCH: 'New Idea Pitch',
    PERFORMANCE_REVIEW: 'Performance Review',
    STRATEGIC_ALIGNMENT: 'Strategic Alignment',
    PROBLEM_SOLVING: 'Problem Solving',
    STAKEHOLDER_ALIGNMENT: 'Stakeholder Alignment'
  };
  return labels[meetingGoal] || meetingGoal;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.playbookId) {
      return NextResponse.json(
        { error: "playbookId is required" },
        { status: 400 }
      );
    }

    if (!body.status) {
      return NextResponse.json(
        { error: "status is required" },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['PENDING', 'COMPLETED', 'FAILED'];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be PENDING, COMPLETED, or FAILED" },
        { status: 400 }
      );
    }

    // Find the playbook
    const existingPlaybook = await prisma.playbook.findUnique({
      where: { id: body.playbookId },
      include: {
        user: {
          select: { id: true, email: true, name: true, planTier: true }
        },
        stakeholder: {
          select: { id: true, name: true, title: true, company: true }
        }
      }
    });

    if (!existingPlaybook) {
      return NextResponse.json(
        { error: "Playbook not found" },
        { status: 404 }
      );
    }

    // Update the playbook with the response from n8n
    const updatedPlaybook = await prisma.playbook.update({
      where: { id: body.playbookId },
      data: {
        status: body.status,
        content: body.content || null,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: { id: true, email: true, name: true, planTier: true }
        },
        stakeholder: {
          select: { id: true, name: true, title: true, company: true }
        }
      }
    });

    // Enhanced logging with playbook type and meeting goal context
    const playbookTypeLabel = getPlaybookTypeLabel(existingPlaybook.playbookType);
    const meetingGoalLabel = existingPlaybook.meetingGoal ? getMeetingGoalLabel(existingPlaybook.meetingGoal) : null;
    
    console.log(`Playbook ${body.playbookId} (${playbookTypeLabel}${meetingGoalLabel ? ` - ${meetingGoalLabel}` : ''}) updated to status: ${body.status}`);
    
    // If completed successfully, trigger additional actions
    if (body.status === 'COMPLETED') {
      const logMessage = `✅ ${playbookTypeLabel} completed for ${updatedPlaybook.user.planTier} user ${updatedPlaybook.user.email} - stakeholder: ${updatedPlaybook.stakeholder.name}`;
      if (meetingGoalLabel) {
        console.log(`${logMessage} (Meeting Goal: ${meetingGoalLabel})`);
      } else {
        console.log(logMessage);
      }
      
      // Optional: Send notification email, update analytics, etc.
      // await sendCompletionNotification(updatedPlaybook);
    }

    if (body.status === 'FAILED') {
      const errorMessage = `❌ ${playbookTypeLabel} failed for ${updatedPlaybook.user.planTier} user ${updatedPlaybook.user.email} - stakeholder: ${updatedPlaybook.stakeholder.name}`;
      if (meetingGoalLabel) {
        console.error(`${errorMessage} (Meeting Goal: ${meetingGoalLabel})`);
      } else {
        console.error(errorMessage);
      }
      
      // Optional: Refund credits, send error notification, etc.
      // await handlePlaybookFailure(updatedPlaybook);
    }

    return NextResponse.json({
      success: true,
      playbook: {
        id: updatedPlaybook.id,
        status: updatedPlaybook.status,
        playbookType: updatedPlaybook.playbookType,
        meetingGoal: updatedPlaybook.meetingGoal,
        user: updatedPlaybook.user.name,
        stakeholder: updatedPlaybook.stakeholder.name,
        updatedAt: updatedPlaybook.updatedAt
      }
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: Add GET method for webhook verification
export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: "VisionsAlign Playbook Webhook Endpoint",
    timestamp: new Date().toISOString(),
    status: "active"
  });
}
