import AdminOverviewClient from "@/components/dashboard/admin/AdminOverviewClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Control Workspace | TR Fitness Arena",
  description:
    "Root operational intelligence analytics and administrative management console.",
};

async function fetchAdminStats() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard-stats`,
      {
        cache: "no-store", // Keep system telemetry calculations live
      },
    );
    if (res.ok) return await res.json();
  } catch (err) {
    console.error("Failed to gather root analytical stats payload:", err);
  }
  return null;
}

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUser = session?.user;

  // Security Gate: Ensure non-admins are routed away immediately
  if (!currentUser || currentUser.role !== "admin") {
    redirect("/dashboard");
  }

  const statsData = await fetchAdminStats();

  return (
    <div className="space-y-6">
      {/* Structural Workspace Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-primary uppercase tracking-widest block">
          Root Operational Control Terminal
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Workspace <span className="text-brand-primary">Overview</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal">
          Real-time platform system metrics, account distributions, and
          discipline categories auditing loops.
        </p>
      </div>

      {/* Main Premium Bento Interface Grid */}
      <AdminOverviewClient stats={statsData} currentUser={currentUser} />
    </div>
  );
}
