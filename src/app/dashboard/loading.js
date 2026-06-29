"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DashboardLoading() {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-xs h-48 md:h-64 mx-auto">
        <DotLottieReact src="/animation/cat.json" loop autoplay />
      </div>
      <p className="text-slate-400 font-semibold animate-pulse mt-2 text-xs font-mono tracking-widest uppercase">
        Syncing Arena Data...
      </p>
    </div>
  );
}
