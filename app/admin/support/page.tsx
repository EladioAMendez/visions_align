import { prisma } from "@/libs/prisma";
import SupportClient from "./SupportClient";

export default async function AdminSupportPage() {
  // No need for auth checks - admin layout already handles this

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
        status: "open",
        priority: "high",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: "2", 
        user: "john.doe@startup.io",
        subject: "Unable to add stakeholders",
        status: "pending",
        priority: "medium",
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

  return (
    <SupportClient 
      totalUsers={totalUsers}
      recentIssues={recentIssues}
      systemStats={systemStats}
    />
  );
}
