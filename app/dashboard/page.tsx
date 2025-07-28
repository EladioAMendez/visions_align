import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import { prisma } from "../../libs/prisma";
import DashboardClient from "./DashboardClient";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect("/api/auth/signin");
  }

  // Fetch user data with subscription info
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      planTier: true,
      playbookCredits: true,
      hasAccess: true,
      createdAt: true,
    },
  });

  // Fetch stakeholders
  const stakeholders = await prisma.stakeholder.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch recent playbooks
  const recentPlaybooks = await prisma.playbook.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      stakeholder: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <DashboardClient 
      user={user}
      stakeholders={stakeholders}
      recentPlaybooks={recentPlaybooks}
    />
  );
};

export default DashboardPage;

