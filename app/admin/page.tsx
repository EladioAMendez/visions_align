"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminDashboardClient from "./AdminDashboardClient";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    
    // Basic admin check
    if (!session?.user?.email || !session.user.email.includes('admin')) {
      router.push("/dashboard");
      return;
    }

    // Fetch dashboard data from API
    fetchDashboardData();
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        console.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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
          <p className="text-slate-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render admin content if not authorized
  if (!session?.user?.email || !session.user.email.includes('admin')) {
    return null;
  }

  // Show loading if data not yet fetched
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-sea-green mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboardClient 
      stats={dashboardData.stats}
      recentUsers={dashboardData.recentUsers}
      recentPlaybooks={dashboardData.recentPlaybooks}
    />
  );
}
