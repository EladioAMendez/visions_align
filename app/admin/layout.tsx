import { ReactNode } from "react";
import { requireAdmin } from "@/middleware/adminAuth";
import AdminNavbar from "@/components/AdminNavbar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // This will redirect if user is not an admin
  await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-900">
      <AdminNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
