import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prisma";
import StakeholdersClient from "./StakeholdersClient";

export const dynamic = 'force-dynamic';

export default async function StakeholdersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  // Get user with stakeholders
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      stakeholders: {
        include: {
          playbooks: {
            select: {
              id: true,
              status: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 3,
          },
          _count: {
            select: {
              playbooks: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
      }
    }
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  return <StakeholdersClient user={user} stakeholders={user.stakeholders} />;
}
