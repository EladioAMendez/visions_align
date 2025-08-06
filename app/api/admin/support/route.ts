import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Basic admin check
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch support-related data
    const [
      totalUsers,
      recentIssues,
      systemStats
    ] = await Promise.all([
      prisma.user.count(),
      // Mock recent issues - you can replace with actual support tickets
      Promise.resolve([
        {
          id: "1",
          user: "maya.chen@techcorp.com",
          subject: "Playbook generation stuck",
          status: "open" as const,
          priority: "high" as const,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
        {
          id: "2", 
          user: "john.doe@startup.io",
          subject: "Unable to add stakeholders",
          status: "pending" as const,
          priority: "medium" as const,
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        }
      ]),
      // System health stats
      Promise.resolve({
        uptime: "99.9%",
        responseTime: "127ms",
        errorRate: "0.1%",
        activeUsers: 42
      })
    ]);

    return NextResponse.json({
      totalUsers,
      recentIssues,
      systemStats
    });

  } catch (error) {
    console.error('Error fetching admin support data:', error);
    return NextResponse.json(
      { error: "Failed to fetch support data" },
      { status: 500 }
    );
  }
}
