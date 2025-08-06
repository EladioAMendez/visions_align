"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    // Basic admin check
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-sea-green mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render admin content if not authorized
  if (!session?.user?.email || !session.user.email.includes('admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <AdminNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
