import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

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
          select: { id: true, email: true, name: true }
        },
        stakeholder: {
          select: { id: true, name: true }
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

    // Log successful completion
    console.log(`Playbook ${body.playbookId} updated to status: ${body.status}`);
    
    // If completed successfully, you could trigger additional actions here
    if (body.status === 'COMPLETED') {
      console.log(`✅ Playbook completed for user ${updatedPlaybook.user.email} - stakeholder: ${updatedPlaybook.stakeholder.name}`);
      
      // Optional: Send notification email, update analytics, etc.
      // await sendCompletionNotification(updatedPlaybook);
    }

    if (body.status === 'FAILED') {
      console.error(`❌ Playbook failed for user ${updatedPlaybook.user.email} - stakeholder: ${updatedPlaybook.stakeholder.name}`);
      
      // Optional: Refund credits, send error notification, etc.
      // await handlePlaybookFailure(updatedPlaybook);
    }

    return NextResponse.json({
      success: true,
      playbook: {
        id: updatedPlaybook.id,
        status: updatedPlaybook.status,
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
