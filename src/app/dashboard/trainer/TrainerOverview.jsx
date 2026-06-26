import {
  FaCalendarCheck,
  FaUsers,
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaAward,
} from "react-icons/fa";

export default function TrainerOverview({ user, metrics }) {
  return (
    <div className="space-y-8">
      {/* 1. Header Title Section */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest font-mono block">
          Trainer Command Console
        </span>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-heading">
          Workspace Overview
        </h1>
      </div>

      {/* 2. Trainer Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Classes Created Card */}
        <div className="bg-brand-dark border border-gray-800/40 rounded-2xl p-6 shadow-xl flex items-center justify-between relative overflow-hidden group hover:border-gray-700/60 transition-all">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono block">
              Total Classes Created
            </span>
            <p className="text-4xl font-black text-white font-heading tracking-tight">
              {metrics.totalClassesCreated}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#242b33] border border-gray-700/20 rounded-xl flex items-center justify-center text-brand-secondary text-lg group-hover:scale-105 transition-transform">
            <FaCalendarCheck />
          </div>
        </div>

        {/* Total Enrolled Students Card */}
        <div className="bg-brand-dark border border-gray-800/40 rounded-2xl p-6 shadow-xl flex items-center justify-between relative overflow-hidden group hover:border-gray-700/60 transition-all">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono block">
              Total Students Enrolled
            </span>
            <p className="text-4xl font-black text-brand-secondary font-heading tracking-tight">
              {metrics.totalStudentsEnrolled}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#242b33] border border-gray-700/20 rounded-xl flex items-center justify-center text-brand-secondary text-lg group-hover:scale-105 transition-transform">
            <FaUsers />
          </div>
        </div>
      </div>

      {/* 3. Identity Card Section */}
      <div className="bg-brand-dark border border-gray-700/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-secondary to-transparent" />

        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 font-mono border-b border-gray-800 pb-3 flex items-center gap-2">
          <FaIdBadge className="text-brand-secondary" /> Coach Authority
          Framework
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile Name */}
          <div className="bg-[#1b2026] p-4 rounded-xl flex items-center gap-3.5 border border-gray-800/40">
            <div className="w-9 h-9 rounded-lg bg-[#242b33] flex items-center justify-center text-gray-400 text-sm">
              <FaUser />
            </div>
            <div>
              <span className="text-[9px] font-bold text-gray-500 font-mono block uppercase">
                Coach Name
              </span>
              <p className="text-xs font-black text-white tracking-wide uppercase">
                {user?.name}
              </p>
            </div>
          </div>

          {/* Email Address */}
          <div className="bg-[#1b2026] p-4 rounded-xl flex items-center gap-3.5 border border-gray-800/40">
            <div className="w-9 h-9 rounded-lg bg-[#242b33] flex items-center justify-center text-gray-400 text-sm">
              <FaEnvelope />
            </div>
            <div>
              <span className="text-[9px] font-bold text-gray-500 font-mono block uppercase">
                Email Address
              </span>
              <p className="text-xs font-bold text-gray-300 font-mono truncate max-w-[180px]">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Role Badge */}
          <div className="bg-[#1b2026] p-4 rounded-xl flex items-center gap-3.5 border border-gray-800/40">
            <div className="w-9 h-9 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary text-sm">
              <FaAward />
            </div>
            <div>
              <span className="text-[9px] font-bold text-gray-500 font-mono block uppercase">
                System Authority
              </span>
              <span className="inline-block bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded font-mono mt-0.5">
                {user?.role || "Trainer"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
