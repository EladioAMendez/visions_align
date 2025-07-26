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

  const stakeholders = await prisma.stakeholder.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <DashboardClient stakeholders={stakeholders} />;
};

export default DashboardPage;

