import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prisma";
import AccountClient from "./AccountClient";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  // Get user with account info
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      planTier: true,
      hasAccess: true,
      linkedinUrl: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          stakeholders: true,
          playbooks: true,
        }
      }
    }
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  return <AccountClient user={user} />;
}
