import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    // Fetch meeting goals from database
    const meetingGoals = await prisma.meetingGoalOption.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        value: true,
        label: true,
        description: true,
      },
    });

    // If no meeting goals in database, return default fallback
    if (meetingGoals.length === 0) {
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
      return NextResponse.json(defaultGoals, { status: 200 });
    }

    return NextResponse.json(meetingGoals, { status: 200 });
  } catch (error) {
    console.error('Error fetching meeting goals:', error);
    return NextResponse.json(
      { error: "Failed to fetch meeting goals" },
      { status: 500 }
    );
  }
}


