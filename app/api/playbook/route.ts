import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

// This function handles POST requests to /api/playbook
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // In a real application, you would get data from the request body
  // const body = await req.json();
  // const { stakeholderInfo, meetingContext } = body;

  // For now, we'll return a simple, hardcoded playbook
  const samplePlaybook = {
    playbookId: `playbook_${Date.now()}`,
    generatedFor: session.user?.email,
    stakeholderAnalysis: {
      name: "John Doe",
      title: "Chief Financial Officer",
      personalityTraits: ["Analytical", "Data-driven", "Risk-averse"],
      communicationStyle: "Prefers concise, data-backed arguments. Avoids fluff.",
      keyMotivations: ["Protecting company assets", "Demonstrating ROI", "Maintaining budget integrity"],
    },
    meetingStrategy: {
      openingStatement: "Lead with the financial impact and ROI of this initiative.",
      keyTalkingPoints: [
        "This project is projected to increase efficiency by 15% in Q3.",
        "The initial investment of $50k will be recouped within 6 months.",
        "We have a contingency plan to mitigate potential risks A, B, and C.",
      ],
      potentialObjections: {
        "What about the impact on current resources?": "We've allocated a dedicated team, ensuring no disruption to ongoing operations.",
        "Is the timeline realistic?": "The timeline includes a 2-week buffer for unforeseen challenges.",
      },
    },
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(samplePlaybook);
}
