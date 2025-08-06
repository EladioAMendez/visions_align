import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

// Default meeting goals (used as fallback when database is unavailable)
const defaultGoals = [
  {
    value: 'PROJECT_UPDATE',
    label: 'Project Update',
    description: 'Status reports, progress reviews, milestone check-ins',
  },
  {
    value: 'BUDGET_ASK',
    label: 'Budget Ask',
    description: 'Resource requests, funding proposals, investment pitches',
  },
  {
    value: 'NEW_IDEA_PITCH',
    label: 'New Idea Pitch',
    description: 'Innovation proposals, new initiatives, creative concepts',
  },
  {
    value: 'PERFORMANCE_REVIEW',
    label: 'Performance Review',
    description: 'Performance discussions, feedback sessions, career conversations',
  },
  {
    value: 'STRATEGIC_ALIGNMENT',
    label: 'Strategic Alignment',
    description: 'Strategic planning, goal setting, vision alignment',
  },
  {
    value: 'PROBLEM_SOLVING',
    label: 'Problem Solving',
    description: 'Issue resolution, troubleshooting, crisis management',
  },
  {
    value: 'STAKEHOLDER_ALIGNMENT',
    label: 'Stakeholder Alignment',
    description: 'Getting buy-in, consensus building, coalition formation',
  },
];

export async function GET() {
  try {
    // Try to fetch meeting goals from database
    const meetingGoals = await prisma.meetingGoalOption.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        value: true,
        label: true,
        description: true,
      },
    });

    // If we have meeting goals in database, return them
    if (meetingGoals.length > 0) {
      return NextResponse.json(meetingGoals);
    }

    // If no meeting goals in database, return default fallback
    return NextResponse.json(defaultGoals);
  } catch (error) {
    console.error('Error fetching meeting goals (falling back to defaults):', error);
    // Return default goals if database is unavailable (e.g., during build time)
    return NextResponse.json(defaultGoals);
  }
}


