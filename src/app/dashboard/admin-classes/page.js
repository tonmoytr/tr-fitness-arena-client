import AdminClassesClient from "@/components/dashboard/admin/AdminClassesClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Routine Management Panel | TR Fitness Arena",
  description:
    "Global administrative training routine audit logs and class moderation center.",
};

async function fetchAllPlatformClasses() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/classes`,
      {
        cache: "no-store", // Ensure real-time consistency for status modifications
      },
    );
    if (res.ok) return await res.json();
  } catch (err) {
    console.error("Failed executing global routine log lookup:", err);
  }
  return [];
}

export default async function AdminClassesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUser = session?.user;

  // Root Administration Security Gate
  if (!currentUser || currentUser.role !== "admin") {
    redirect("/dashboard");
  }

  const globalClasses = await fetchAllPlatformClasses();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-secondary uppercase tracking-widest block">
          Platform Content Review Node
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Manage <span className="text-brand-secondary">Classes</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal">
          Audit incoming training templates, approve valid schedule modules, or
          purge non-compliant records permanently.
        </p>
      </div>

      {/* Main Interactive Moderation Ledger Grid */}
      <AdminClassesClient initialClasses={globalClasses} />
    </div>
  );
}
