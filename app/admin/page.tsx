import { requireAdmin } from "@/middleware/adminAuth";
import { prisma } from "@/libs/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboard() {
  await requireAdmin();

  // Get admin dashboard stats
  const [
    totalUsers,
    activeUsers,
    paidUsers,
    totalStakeholders,
    totalPlaybooks,
    recentUsers,
    recentPlaybooks
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        updatedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }
    }),
    prisma.user.count({
      where: {
        planTier: {
          in: ['PRO', 'DIRECTOR']
        }
      }
    }),
    prisma.stakeholder.count(),
    prisma.playbook.count(),
    prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        planTier: true,
        createdAt: true,
        hasAccess: true,
      }
    }),
    prisma.playbook.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
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

  const stats = {
    totalUsers,
    activeUsers,
    paidUsers,
    totalStakeholders,
    totalPlaybooks,
    conversionRate: totalUsers > 0 ? ((paidUsers / totalUsers) * 100).toFixed(1) : '0',
  };

  return (
    <AdminDashboardClient 
      stats={stats}
      recentUsers={recentUsers}
      recentPlaybooks={recentPlaybooks}
    />
  );
}
