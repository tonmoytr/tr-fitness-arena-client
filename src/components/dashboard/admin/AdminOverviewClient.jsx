"use client";

import {
  HiOutlineUsers,
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

export default function AdminOverviewClient({ stats, currentUser }) {
  // Fallback defaults if the aggregation endpoint returns empty fields
  const data = stats || {
    totalUsers: 0,
    totalClasses: 0,
    estimatedRevenue: 0,
    roleDistribution: { admin: 0, trainer: 0, user: 0 },
    categoryDistribution: {},
  };

  // Quick mathematical percentages calculation for our custom graphs
  const totalRoles = data.totalUsers || 1;
  const userPct = Math.round((data.roleDistribution.user / totalRoles) * 100);
  const trainerPct = Math.round(
    (data.roleDistribution.trainer / totalRoles) * 100,
  );
  const adminPct = Math.round((data.roleDistribution.admin / totalRoles) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. HIGH-VELOCITY METRIC ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Card A: Total Registered Accounts */}
        <div className="bg-brand-dark border border-gray-800/60 rounded-2xl p-5 flex items-center justify-between relative overflow-hidden group hover:border-gray-700/60 transition-all shadow-xl">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500">
              Total Accounts Logged
            </span>
            <h3 className="text-3xl font-black font-mono text-white">
              {data.totalUsers}
            </h3>
          </div>
          <div className="w-12 h-12 bg-[#242b33]/60 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-brand-primary border border-gray-800 transition-colors">
            <HiOutlineUsers size={20} />
          </div>
        </div>

        {/* Card B: Approved Platform Classes */}
        <div className="bg-brand-dark border border-gray-800/60 rounded-2xl p-5 flex items-center justify-between relative overflow-hidden group hover:border-brand-primary/20 transition-all shadow-xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500">
              Active Approved Classes
            </span>
            <h3 className="text-3xl font-black font-mono text-brand-primary">
              {data.totalClasses}
            </h3>
          </div>
          <div className="w-12 h-12 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary border border-brand-primary/20 transition-colors">
            <HiOutlineCalendarDays size={20} />
          </div>
        </div>

        {/* Card C: Estimated Revenue Matrix */}
        <div className="bg-brand-dark border border-gray-800/60 rounded-2xl p-5 flex items-center justify-between relative overflow-hidden group hover:border-gray-700/60 transition-all shadow-xl">
          <div className="space-y-1">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500">
              Estimated Revenue Output
            </span>
            <h3 className="text-3xl font-black font-mono text-white">
              ${data.estimatedRevenue}
            </h3>
          </div>
          <div className="w-12 h-12 bg-[#242b33]/60 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-emerald-400 border border-gray-800 transition-colors">
            <HiOutlineCurrencyDollar size={20} />
          </div>
        </div>
      </div>

      {/* 2. ROOT ADMINISTRATOR AUTHORITY DOSSIER BANNER */}
      <div className="bg-brand-dark border border-gray-800/50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[2px] h-full bg-brand-primary" />
        <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-xl shrink-0 overflow-hidden font-bold text-white uppercase bg-gradient-to-br from-gray-700 to-brand-dark">
          {currentUser?.name?.charAt(0) || "A"}
        </div>
        <div className="space-y-0.5">
          <h4 className="text-sm font-black uppercase tracking-wide text-white font-heading flex items-center gap-2">
            {currentUser?.name}
            <span className="text-[8px] font-mono font-black text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase tracking-widest">
              Root System Master
            </span>
          </h4>
          <p className="text-xs font-mono text-gray-500">
            {currentUser?.email}
          </p>
        </div>
      </div>

      {/* 3. DUAL CORE VISUAL METRICS PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Classes by Discipline Category */}
        <div className="bg-brand-dark border border-gray-800/60 rounded-3xl p-6 space-y-5 shadow-2xl">
          <h3 className="text-xs font-black uppercase tracking-wider text-white font-heading border-b border-gray-800/60 pb-3">
            Classes by Category Breakdown
          </h3>
          <div className="space-y-4">
            {Object.keys(data.categoryDistribution).length === 0 ? (
              <p className="text-xs text-gray-600 italic py-4 font-mono">
                No category documents tracked yet.
              </p>
            ) : (
              Object.entries(data.categoryDistribution).map(
                ([category, count]) => (
                  <div key={category} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400 font-bold uppercase">
                        {category}
                      </span>
                      <span className="text-brand-primary font-black">
                        {count} Active
                      </span>
                    </div>
                    {/* Custom animated geometric bar meter */}
                    <div className="w-full h-2 bg-[#1b2026] rounded-full overflow-hidden border border-gray-800/30">
                      <div
                        className="h-full bg-brand-primary rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min((count / (data.totalClasses || 1)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ),
              )
            )}
          </div>
        </div>

        {/* Right Side: Account Demographics Matrix */}
        <div className="bg-brand-dark border border-gray-800/60 rounded-3xl p-6 space-y-5 shadow-2xl flex flex-col justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-white font-heading border-b border-gray-800/60 pb-3">
            User Role Demographics
          </h3>

          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {/* Standard Member Progress Block */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400 uppercase">
                  Standard Users ({data.roleDistribution.user})
                </span>
                <span className="text-white font-bold">{userPct}%</span>
              </div>
              <div className="w-full h-2 bg-[#1b2026] rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500"
                  style={{ width: `${userPct}%` }}
                />
              </div>
            </div>

            {/* Certified Trainer Progress Block */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400 uppercase">
                  Certified Coaches ({data.roleDistribution.trainer})
                </span>
                <span className="text-brand-primary font-bold">
                  {trainerPct}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#1b2026] rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary"
                  style={{ width: `${trainerPct}%` }}
                />
              </div>
            </div>

            {/* Authority Administrators Progress Block */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-400 uppercase">
                  System Operators ({data.roleDistribution.admin})
                </span>
                <span className="text-red-400 font-bold">{adminPct}%</span>
              </div>
              <div className="w-full h-2 bg-[#1b2026] rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${adminPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
