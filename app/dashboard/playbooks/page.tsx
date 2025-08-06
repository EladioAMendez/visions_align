import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prisma";
import PlaybooksClient from "./PlaybooksClient";

export default async function PlaybooksPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  // Get user with playbooks
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      playbooks: {
        include: {
          stakeholder: {
            select: {
              id: true,
              name: true,
              title: true,
              company: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
      },
      stakeholders: {
        select: {
          id: true,
          name: true,
          title: true,
          company: true,
        }
      }
    }
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  return <PlaybooksClient user={user} />;
}
