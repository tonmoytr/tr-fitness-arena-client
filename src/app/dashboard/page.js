import {
  FaChartBar,
  FaHeart,
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaExclamationTriangle,
} from "react-icons/fa";

export default async function DashboardOverviewPage() {
  // Simulated database payload — will fetch from your Express/MongoDB API later
  const stats = {
    totalBooked: 2,
    totalFavorites: 4,
  };

  const user = {
    name: "Tonmoy",
    email: "developer@trfitness.com",
    role: "User", // Standard Member Badge
  };

  const trainerApplication = {
    status: "Rejected", // Options: "Pending" | "Rejected" | "Approved"
    adminFeedback:
      "The submitted international certification timeline parameters do not match global system indexing rules. Please upload a clear copy of your specialization credentials.",
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Title Section */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest font-mono block">
          Account Console
        </span>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-heading">
          Workspace Overview
        </h1>
      </div>

      {/* 2. Dribbble-Inspired High-Impact Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Booked Card */}
        <div className="bg-[#303841] border border-gray-800/40 rounded-2xl p-6 shadow-xl flex items-center justify-between relative overflow-hidden group hover:border-gray-700/60 transition-all">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono block">
              Enrolled Classes
            </span>
            <p className="text-4xl font-black text-white font-heading tracking-tight">
              {stats.totalBooked}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#242b33] border border-gray-700/20 rounded-xl flex items-center justify-center text-brand-secondary text-lg group-hover:scale-105 transition-transform">
            <FaChartBar />
          </div>
        </div>

        {/* Total Favorites Card */}
        <div className="bg-[#303841] border border-gray-800/40 rounded-2xl p-6 shadow-xl flex items-center justify-between relative overflow-hidden group hover:border-gray-700/60 transition-all">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono block">
              Tracked Favorites
            </span>
            <p className="text-4xl font-black text-brand-primary font-heading tracking-tight">
              {stats.totalFavorites}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#242b33] border border-gray-700/20 rounded-xl flex items-center justify-center text-brand-primary text-lg group-hover:scale-105 transition-transform">
            <FaHeart />
          </div>
        </div>
      </div>

      {/* 3. Master Info Section (Profile & Onboarding Logs) */}
      <div className="bg-[#303841] border border-gray-700/30 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-secondary to-transparent" />

        {/* Profile Grid Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 font-mono border-b border-gray-800 pb-3 flex items-center gap-2">
            <FaIdBadge className="text-brand-secondary" /> Identity Framework
            Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name Field */}
            <div className="bg-[#1b2026] p-4 rounded-xl flex items-center gap-3.5 border border-gray-800/40">
              <div className="w-9 h-9 rounded-lg bg-[#242b33] flex items-center justify-center text-gray-400 text-sm">
                <FaUser />
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-500 font-mono block uppercase">
                  Profile Name
                </span>
                <p className="text-xs font-black text-white tracking-wide uppercase">
                  {user.name}
                </p>
              </div>
            </div>

            {/* Email Field */}
            <div className="bg-[#1b2026] p-4 rounded-xl flex items-center gap-3.5 border border-gray-800/40 md:col-span-1">
              <div className="w-9 h-9 rounded-lg bg-[#242b33] flex items-center justify-center text-gray-400 text-sm">
                <FaEnvelope />
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-500 font-mono block uppercase">
                  Email Address
                </span>
                <p className="text-xs font-bold text-gray-300 font-mono truncate max-w-[180px]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Role Badge Field */}
            <div className="bg-[#1b2026] p-4 rounded-xl flex items-center gap-3.5 border border-gray-800/40">
              <div className="w-9 h-9 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary text-sm font-mono font-black">
                R
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-500 font-mono block uppercase">
                  System Authority
                </span>
                <span className="inline-block bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded font-mono mt-0.5">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trainer Onboarding Status Section */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 font-mono border-b border-gray-800 pb-3">
            Trainer Boarding Log
          </h3>

          <div className="bg-[#1b2026] border border-gray-800/60 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-gray-500 font-mono block uppercase">
                Current Pipeline Status
              </span>
              <p className="text-xs font-black text-white uppercase tracking-wide">
                Coach Credential Approval Verification
              </p>
            </div>

            {/* Dynamic Status Badge Badge Styling */}
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg font-mono border self-start sm:self-auto ${
                trainerApplication.status === "Rejected"
                  ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary"
                  : trainerApplication.status === "Pending"
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              }`}
            >
              {trainerApplication.status}
            </span>
          </div>

          {/* Conditional Rejection Feedback Area */}
          {trainerApplication.status === "Rejected" && (
            <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-5 space-y-2.5 animate-fadeIn">
              <div className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest font-mono">
                <FaExclamationTriangle className="text-xs" /> Administrative
                Response Feedback Log
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-normal bg-[#242b33]/40 p-3.5 rounded-xl border border-gray-800/40">
                {trainerApplication.adminFeedback}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
