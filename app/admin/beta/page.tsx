import { requireAdmin } from "@/middleware/adminAuth";
import { prisma } from "@/libs/prisma";
import BetaManagementClient from "./BetaManagementClient";

export default async function BetaManagement() {
  await requireAdmin();

  // Get beta-related stats
  const [
    betaUsers,
    pendingRequests,
    recentSignups
  ] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          { hasAccess: true },
          { planTier: { in: ['PRO', 'DIRECTOR'] } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        planTier: true,
        hasAccess: true,
        createdAt: true,
        _count: {
          select: {
            stakeholders: true,
            playbooks: true,
          }
        }
      }
    }),
    prisma.user.findMany({
      where: {
        hasAccess: false,
        planTier: 'STARTER'
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    }),
    prisma.user.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        planTier: true,
        hasAccess: true,
        createdAt: true,
      }
    })
  ]);

  return (
    <BetaManagementClient 
      betaUsers={betaUsers}
      pendingRequests={pendingRequests}
      recentSignups={recentSignups}
    />
  );
}
