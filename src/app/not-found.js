"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { HiArrowNarrowLeft, HiHome } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#1b2026] text-white p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg text-center space-y-6 relative z-10">
        {/* Lottie 404 Animation */}
        <div className="w-full max-w-sm h-64 md:h-80 mx-auto drop-shadow-[0_0_35px_rgba(255,87,34,0.15)]">
          <DotLottieReact src="/animation/404-error.json" loop autoplay />
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary font-mono bg-brand-primary/10 px-3 py-1.5 rounded-full">
            Error Code: 404
          </span>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-heading mt-2">
            Lost in the <span className="text-brand-primary">Arena</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved, deleted, or never existed in our training parameters. Let's get you back on track.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#242b33] hover:bg-[#2d353f] border border-gray-700/60 hover:border-gray-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
          >
            <HiArrowNarrowLeft className="text-base" /> Go Back
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#e04e1d] text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-primary/15 hover:shadow-brand-primary/25 cursor-pointer"
          >
            <HiHome className="text-base" /> Return to Arena
          </Link>
        </div>
      </div>
    </div>
  );
}
