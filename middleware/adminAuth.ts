import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import { appConfig } from '@/libs/config';

// Get admin emails from centralized config
const ADMIN_EMAILS = appConfig.admin.emails;

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }
  
  if (!ADMIN_EMAILS.includes(session.user.email)) {
    redirect("/dashboard");
  }
  
  return session;
}

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
}
