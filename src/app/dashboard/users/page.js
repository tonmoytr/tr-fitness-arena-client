import SystemUsersClient from "@/components/dashboard/admin/SystemUsersClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "System Users Management | TR Fitness Arena",
  description:
    "Administrative account governance matrix and security role assignments.",
};

async function fetchSystemUsers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`, {
      cache: "no-store", // Keep database directory rosters completely fresh
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.error("RSC account roster lookup failure:", err);
  }
  return [];
}

export default async function SystemUsersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUser = session?.user;

  // Root Authority Verification Gate
  if (!currentUser || currentUser.role !== "admin") {
    redirect("/dashboard");
  }

  const userRoster = await fetchSystemUsers();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-primary uppercase tracking-widest block">
          Security Access Control Ledger
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          System <span className="text-brand-primary">Users</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal">
          Manage system authority credentials, evaluate account status, and
          modify user platform roles.
        </p>
      </div>

      {/* Main Account Data Grid Container */}
      <SystemUsersClient
        initialUsers={userRoster}
        currentAdminId={currentUser.id}
      />
    </div>
  );
}
