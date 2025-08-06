import { NextResponse } from "next/server";
import { aiConfig } from "@/libs/config";

export async function GET() {
  try {
    // Return meeting goals with labels for Goal-Oriented Playbooks
    const meetingGoals = Object.entries(aiConfig.playbooks.meetingGoalLabels).map(([value, label]) => ({
      value,
      label,
      description: getMeetingGoalDescription(value)
    }));

    return NextResponse.json({ meetingGoals }, { status: 200 });
  } catch (error) {
    console.error('Error fetching meeting goals:', error);
    return NextResponse.json(
      { error: "Failed to fetch meeting goals" },
      { status: 500 }
    );
  }
}

function getMeetingGoalDescription(goalType: string): string {
  const descriptions: Record<string, string> = {
    PROJECT_UPDATE: "Status reports, progress reviews, milestone check-ins",
    BUDGET_ASK: "Resource requests, funding proposals, investment pitches",
    NEW_IDEA_PITCH: "Innovation proposals, new initiatives, creative concepts",
    PERFORMANCE_REVIEW: "Performance discussions, feedback sessions, career conversations",
    STRATEGIC_ALIGNMENT: "Strategic planning, goal setting, vision alignment",
    PROBLEM_SOLVING: "Issue resolution, troubleshooting, crisis management",
    STAKEHOLDER_ALIGNMENT: "Getting buy-in, consensus building, coalition formation"
  };
  
  return descriptions[goalType] || "Meeting-specific guidance and preparation";
}
