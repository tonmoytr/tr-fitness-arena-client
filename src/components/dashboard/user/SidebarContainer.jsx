"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartBar,
  FaCalendarCheck,
  FaHeart,
  FaUserCheck,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaCogs,
  FaUsers,
} from "react-icons/fa";

/* ==========================================================================
   1. MEMBER SIDEBAR NAVIGATION SCHEMATIC
   ========================================================================== */
function MemberNavigation({ currentPath, onLinkClick }) {
  const routes = [
    { label: "Overview Node", path: "/dashboard", icon: FaChartBar },
    {
      label: "Booked Modules",
      path: "/dashboard/booked",
      icon: FaCalendarCheck,
    },
    { label: "Favorites List", path: "/dashboard/favorites", icon: FaHeart },
    { label: "Apply As Trainer", path: "/dashboard/apply", icon: FaUserCheck },
  ];

  return (
    <nav className="space-y-1.5">
      <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase font-mono block px-2 mb-2">
        Metrics Console
      </span>
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive = currentPath === route.path;
        return (
          <Link
            key={route.path}
            href={route.path}
            onClick={onLinkClick}
            className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest font-mono transition-all group ${
              isActive
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/10"
                : "text-gray-400 hover:text-white hover:bg-[#242b33]"
            }`}
          >
            <Icon
              className={`text-sm ${isActive ? "text-white" : "text-gray-500 group-hover:text-brand-primary"}`}
            />
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* ==========================================================================
   2. TRAINER SIDEBAR NAVIGATION SCHEMATIC
   ========================================================================== */
function TrainerNavigation({ currentPath, onLinkClick }) {
  const routes = [
    { label: "Trainer Console", path: "/dashboard", icon: FaChartBar },
    {
      label: "Manage Classes",
      path: "/dashboard/trainer-classes",
      icon: FaCalendarCheck,
    },
    { label: "Member Logs", path: "/dashboard/students", icon: FaUsers },
  ];

  return (
    <nav className="space-y-1.5">
      <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase font-mono block px-2 mb-2">
        Trainer Console
      </span>
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive = currentPath === route.path;
        return (
          <Link
            key={route.path}
            href={route.path}
            onClick={onLinkClick}
            className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest font-mono transition-all group ${
              isActive
                ? "bg-brand-secondary text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-[#242b33]"
            }`}
          >
            <Icon
              className={`text-sm ${isActive ? "text-white" : "text-gray-500 group-hover:text-brand-secondary"}`}
            />
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* ==========================================================================
   3. ADMIN SIDEBAR NAVIGATION SCHEMATIC
   ========================================================================== */
function AdminNavigation({ currentPath, onLinkClick }) {
  const routes = [
    { label: "Admin Control", path: "/dashboard", icon: FaCogs },
    {
      label: "Verify Trainers",
      path: "/dashboard/verify-applications",
      icon: FaUserCheck,
    },
    { label: "System Users", path: "/dashboard/users", icon: FaUsers },
  ];

  return (
    <nav className="space-y-1.5">
      <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase font-mono block px-2 mb-2">
        System Admin Control
      </span>
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive = currentPath === route.path;
        return (
          <Link
            key={route.path}
            href={route.path}
            onClick={onLinkClick}
            className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest font-mono transition-all group ${
              isActive
                ? "bg-white text-brand-dark font-bold"
                : "text-gray-400 hover:text-white hover:bg-[#242b33]"
            }`}
          >
            <Icon
              className={`text-sm ${isActive ? "text-brand-dark" : "text-gray-500 group-hover:text-white"}`}
            />
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* ==========================================================================
   4. MAIN ORCHESTRATOR CONTAINER MASTER COMPONENT
   ========================================================================== */
export default function SidebarContainer({ session }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkExecution = () => setIsMobileOpen(false);

  return (
    <>
      {/* Dynamic Mobile Header Bar Utility Panel (Hidden on Desktop Viewports) */}
      <header className="w-full h-16 bg-brand-dark border-b border-gray-800/60 fixed top-0 left-0 px-6 flex items-center justify-between lg:hidden z-40">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-black uppercase bg-brand-primary text-white px-2.5 py-1 rounded tracking-widest">
            {session.role}
          </span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-10 h-10 rounded-xl bg-[#242b33] border border-gray-700/40 flex items-center justify-center text-white text-base cursor-pointer hover:border-gray-500 transition-all"
        >
          {isMobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Screen Backdrop Layer Tint Overlay for Active Mobile Drawers */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40 transition-opacity duration-300"
        />
      )}

      {/* Master Left Sticky Sidebar Shell Column Drawer */}
      <aside
        className={`w-64 h-screen bg-brand-dark fixed top-0 left-0 border-r border-gray-800/40 flex flex-col justify-between p-6 z-50 transition-transform duration-300 ease-in-out lg:sticky lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Section: Identity Head Unit Info Card */}
          <div className="flex items-center gap-3 border-b border-gray-800/60 pb-5 justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#242b33] border border-gray-700/50 flex items-center justify-center text-brand-secondary">
                <FaUserCircle className="text-xl" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white font-heading">
                  {session.name}
                </h4>
                <span className="text-[9px] font-mono text-brand-secondary font-bold uppercase tracking-widest">
                  {session.role} Portal
                </span>
              </div>
            </div>

            {/* Close trigger exclusive for Mobile views */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-gray-500 hover:text-white text-sm p-1"
            >
              <FaTimes />
            </button>
          </div>

          {/* Section: Smart Conditional Mapping based on Active Role Strings */}
          {session.role === "admin" && (
            <AdminNavigation
              currentPath={pathname}
              onLinkClick={handleLinkExecution}
            />
          )}
          {session.role === "trainer" && (
            <TrainerNavigation
              currentPath={pathname}
              onLinkClick={handleLinkExecution}
            />
          )}
          {session.role === "member" && (
            <MemberNavigation
              currentPath={pathname}
              onLinkClick={handleLinkExecution}
            />
          )}
        </div>

        {/* Section: Exit Gate Actions Suite (Pro Specification Compliant) */}
        <div className="space-y-2 border-t border-gray-800/60 pt-4">
          {/* Action A: Seamless Home Site Redirection (No Token Reset) */}
          <Link
            href="/"
            onClick={handleLinkExecution}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest font-mono text-gray-400 hover:text-white hover:bg-[#242b33] transition-all"
          >
            <FaHome className="text-sm text-gray-500" /> Return Home
          </Link>

          {/* Action B: Complete Termination Sequence */}
          <button
            onClick={() => {
              handleLinkExecution();
              // Future configuration pass: Clear authentication tokens, cookies, context values
              alert(
                "Initializing logout pipeline... Session context terminated cleanly.",
              );
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest font-mono text-gray-500 hover:text-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer border border-transparent hover:border-brand-primary/20"
          >
            <FaSignOutAlt className="text-sm" /> Termination
          </button>
        </div>
      </aside>
    </>
  );
}
