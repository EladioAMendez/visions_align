import { requireAdmin } from "@/middleware/adminAuth";
import { prisma } from "@/libs/prisma";
import UsersManagementClient from "./UsersManagementClient";

export default async function UsersManagement() {
  await requireAdmin();

  // Get all users with their data
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      planTier: true,
      hasAccess: true,
      playbookCredits: true,
      stripeCustomerId: true,
      stripePriceId: true,
      createdAt: true,
      updatedAt: true,
      stakeholders: {
        select: {
          id: true,
          name: true,
        }
      },
      playbooks: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      _count: {
        select: {
          stakeholders: true,
          playbooks: true,
        }
      }
    }
  });

  return <UsersManagementClient users={users} />;
}
