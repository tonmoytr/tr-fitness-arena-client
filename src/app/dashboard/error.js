"use client";

import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { HiRefresh } from "react-icons/hi";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error("Dashboard Collision Error:", error);
  }, [error]);

  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      {/* Lottie Error/Nothing Animation */}
      <div className="w-full max-w-xs h-48 md:h-64 mx-auto">
        <DotLottieReact src="/animation/nothing.json" loop autoplay />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary font-mono bg-brand-primary/10 px-3 py-1 rounded-full">
          Workspace Error
        </span>
        <h2 className="text-2xl font-black uppercase tracking-tight text-white font-heading mt-2">
          Dashboard Sync Failure
        </h2>
        <p className="text-gray-400 text-xs max-w-sm mx-auto leading-relaxed">
          An unexpected error occurred while loading this workspace segment. Press below to re-verify cache.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-brand-primary hover:bg-[#e04e1d] text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-primary/15 hover:shadow-brand-primary/25 cursor-pointer mx-auto"
      >
        <HiRefresh className="text-base" /> Retry Workspace
      </button>
    </div>
  );
}
