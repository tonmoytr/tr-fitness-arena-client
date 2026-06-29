"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="min-h-[90vh] w-full flex flex-col items-center justify-center bg-[#1b2026]">
      <div className="w-full max-w-sm h-64 md:h-80 mx-auto">
        <DotLottieReact src="/animation/cat.json" loop autoplay />
      </div>
      <p className="text-slate-400 font-medium animate-pulse mt-4 text-sm font-mono tracking-wider uppercase">
        Arranging your shelf...
      </p>
    </div>
  );
}
