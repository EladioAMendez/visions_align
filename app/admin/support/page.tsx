"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SupportClient from "./SupportClient";

export default function AdminSupportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [supportData, setSupportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    
    // Basic admin check
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      router.push("/dashboard");
      return;
    }

    // Fetch support data from API
    fetchSupportData();
  }, [session, status, router]);

  const fetchSupportData = async () => {
    try {
      const response = await fetch('/api/admin/support');
      if (response.ok) {
        const data = await response.json();
        setSupportData(data);
      } else {
        console.error('Failed to fetch support data');
      }
    } catch (error) {
      console.error('Error fetching support data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking session
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-sea-green mx-auto mb-4"></div>
          <p className="text-slate-400">Loading support dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render admin content if not authorized
  if (!session?.user?.email || !session.user.email.includes('admin')) {
    return null;
  }

  // Show loading if data not yet fetched
  if (!supportData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-sea-green mx-auto mb-4"></div>
          <p className="text-slate-400">Loading support data...</p>
        </div>
      </div>
    );
  }

  return (
    <SupportClient 
      totalUsers={supportData.totalUsers}
      recentIssues={supportData.recentIssues}
      systemStats={supportData.systemStats}
    />
  );
}
