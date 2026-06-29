"use client";

import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { HiRefresh, HiHome } from "react-icons/hi";

export default function RootError({ error, reset }) {
  useEffect(() => {
    console.error("Root Pipeline Collision:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#1b2026] text-white p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg text-center space-y-6 relative z-10">
        {/* Lottie Warning Animation */}
        <div className="w-full max-w-sm h-64 md:h-80 mx-auto drop-shadow-[0_0_35px_rgba(255,87,34,0.1)]">
          <DotLottieReact src="/animation/nothing.json" loop autoplay />
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary font-mono bg-brand-primary/10 px-3 py-1.5 rounded-full">
            System Collision Detected
          </span>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-heading mt-2">
            Unexpected <span className="text-brand-primary">Failure</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            The application pipeline encountered a runtime exception. You can attempt to retry the failed segment, or return to the main dashboard.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#242b33] hover:bg-[#2d353f] border border-gray-700/60 hover:border-gray-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
          >
            <HiRefresh className="text-base" /> Retry Request
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#e04e1d] text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-primary/15 hover:shadow-brand-primary/25 cursor-pointer"
          >
            <HiHome className="text-base" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
