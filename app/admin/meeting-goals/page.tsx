import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { redirect } from "next/navigation";
import MeetingGoalsAdmin from "./MeetingGoalsAdmin";

export default async function AdminMeetingGoalsPage() {
  const session = await getServerSession(authOptions);
  
  // Basic admin check - enhance this with proper role-based access
  if (!session?.user?.email || !session.user.email.includes('admin')) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-sea-green mb-2">
            Meeting Goals Administration
          </h1>
          <p className="text-slate-400">
            Manage the meeting goal options available in the playbook generation modal.
          </p>
        </div>
        
        <MeetingGoalsAdmin />
      </div>
    </div>
  );
}
