import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import crypto from "crypto";

// Security configuration
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
const ALLOWED_IPS = process.env.WEBHOOK_ALLOWED_IPS?.split(',') || [];

// Rate limiting (simple in-memory store - use Redis for production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

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
    // Security Layer 1: API Key Authentication
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.replace('Bearer ', '');
    
    if (!WEBHOOK_SECRET || !apiKey || apiKey !== WEBHOOK_SECRET) {
      console.warn('🚨 Unauthorized webhook attempt:', {
        hasSecret: !!WEBHOOK_SECRET,
        hasApiKey: !!apiKey,
        ip: getClientIP(req)
      });
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Security Layer 2: IP Whitelisting (if configured)
    const clientIP = getClientIP(req);
    if (ALLOWED_IPS.length > 0 && !ALLOWED_IPS.includes(clientIP)) {
      console.warn('🚨 IP not whitelisted:', clientIP);
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Security Layer 3: Rate Limiting
    const rateLimitKey = clientIP;
    const now = Date.now();
    const windowData = rateLimitStore.get(rateLimitKey);
    
    if (windowData && now < windowData.resetTime) {
      if (windowData.count >= RATE_LIMIT_MAX_REQUESTS) {
        console.warn('🚨 Rate limit exceeded:', { ip: clientIP, count: windowData.count });
        return NextResponse.json(
          { error: "Rate limit exceeded" },
          { status: 429 }
        );
      }
      windowData.count++;
    } else {
      rateLimitStore.set(rateLimitKey, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW
      });
    }

    const body = await req.json();
    
    // Security Layer 4: Request Signature Validation (optional)
    const signature = req.headers.get('x-webhook-signature');
    if (signature && !verifyWebhookSignature(JSON.stringify(body), signature, WEBHOOK_SECRET)) {
      console.warn('🚨 Invalid webhook signature');
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }
    
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

// Security helper functions
function getClientIP(req: NextRequest): string {
  // Check various headers for the real IP (useful behind proxies/CDNs)
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const cfConnectingIP = req.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return req.ip || 'unknown';
}

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    const providedSignature = signature.replace('sha256=', '');
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(providedSignature, 'hex')
    );
  } catch (error) {
    return false;
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
