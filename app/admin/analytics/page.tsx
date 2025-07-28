import { requireAdmin } from "@/middleware/adminAuth";
import { prisma } from "@/libs/prisma";
import AnalyticsClient from "./AnalyticsClient";

export default async function Analytics() {
  await requireAdmin();

  // Get analytics data
  const [
    userGrowth,
    planDistribution,
    playbookStats,
    recentActivity
  ] = await Promise.all([
    // User growth over last 30 days
    prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        COUNT(*)::int as count
      FROM "users"
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `,
    
    // Plan distribution
    prisma.user.groupBy({
      by: ['planTier'],
      _count: {
        planTier: true,
      },
    }),
    
    // Playbook statistics
    prisma.playbook.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    }),
    
    // Recent activity (last 50 playbooks)
    prisma.playbook.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            email: true,
            planTier: true,
          }
        },
        stakeholder: {
          select: {
            name: true,
          }
        }
      }
    })
  ]);

  return (
    <AnalyticsClient 
      userGrowth={userGrowth as any[]}
      planDistribution={planDistribution}
      playbookStats={playbookStats}
      recentActivity={recentActivity}
    />
  );
}
