import SidebarContainer from "@/components/dashboard/user/SidebarContainer";

// Pure React Server Component Layout (RSC)
export default async function DashboardLayout({ children }) {
  // Real-world server database session token simulation
  const mockServerSession = { name: "Tonmoy", role: "member" }; // change to "trainer" or "admin" to test other views

  return (
    <div className="w-full min-h-screen bg-[#1b2026] flex text-gray-100 font-sans relative overflow-x-hidden">
      {/* Mount your master Sidebar Container here and pass down the server session */}
      <SidebarContainer session={mockServerSession} />

      {/* Fluid Dynamic Workspace Panel */}
      <div className="flex-1 min-h-screen overflow-y-auto px-4 sm:px-6 md:px-10 py-10 pt-24 lg:pt-10 transition-all duration-300 relative z-10">
        {children}
      </div>
    </div>
  );
}
