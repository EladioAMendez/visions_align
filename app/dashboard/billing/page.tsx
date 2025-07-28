import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prisma";
import BillingClient from "./BillingClient";

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  // Get user with billing info
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      planTier: true,
      hasAccess: true,
      stripeCustomerId: true,
      stripePriceId: true,
      createdAt: true,
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

  return <BillingClient user={user} />;
}
