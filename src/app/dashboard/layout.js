import SidebarContainer from "@/components/dashboard/user/SidebarContainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  // 1. Fetch the real, live authenticated session profile directly on the server
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Route protection gate check
  if (!sessionData?.user) {
    redirect("/signin");
  }

  return (
    // FIXED: Changed min-h-screen to h-screen and added overflow-hidden to lock the outer window viewport
    <div className="w-full h-screen bg-[#1b2026] flex text-gray-100 font-sans relative overflow-hidden">
      {/* 3. Mount Sidebar and pass down the real auth database parameters */}
      {/* The sidebar will automatically inherit h-full or fill the rigid viewport structure cleanly */}
      <SidebarContainer session={sessionData.user} />

      {/* Fluid Dynamic Workspace Panel */}
      {/* FIXED: Changed min-h-screen to h-full and explicitly set overflow-y-auto so ONLY this column scrolls */}
      <div className="flex-1 h-full overflow-y-auto px-4 sm:px-6 md:px-10 py-10 pt-24 lg:pt-10 transition-all duration-300 relative z-10">
        {children}
      </div>
    </div>
  );
}
