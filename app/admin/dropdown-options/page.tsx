import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prisma";
import DropdownOptionsClient from "./DropdownOptionsClient";

// Check if user is admin
async function isAdmin(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { hasAccess: true, planTier: true }
  });
  
  return user?.hasAccess && (user.planTier === 'PRO' || user.planTier === 'DIRECTOR');
}

export default async function AdminDropdownOptionsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  if (!(await isAdmin(session.user.email))) {
    redirect("/dashboard");
  }

  // Fetch all dropdown options
  const dropdownOptions = await prisma.dropdownOption.findMany({
    orderBy: [
      { category: 'asc' },
      { sortOrder: 'asc' },
    ],
  });

  return <DropdownOptionsClient options={dropdownOptions} />;
}
