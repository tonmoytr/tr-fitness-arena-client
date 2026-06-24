"use client";

import { useState } from "react";
import Link from "next/link";
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

export default function SigninPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future validation hook pipeline connection to Express /api/v1/auth/login
    console.log("Login Payload Locked:", formData);
  };

  return (
    <main className="w-full min-h-screen bg-[#1b2026] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      {/* Left Column: Dedicated Animation Placeholder Slot (Spans 5) */}
      <div className="hidden lg:flex lg:col-span-5 bg-brand-dark relative items-center justify-center p-12 border-r border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 via-transparent to-black/20" />

        {/* Lottie Animation Wrapper Container Slot */}
        <div className="w-full max-w-sm aspect-square bg-[#242b33] rounded-3xl border border-gray-700/30 flex flex-col items-center justify-center p-8 text-center space-y-4 shadow-inner">
          <div className="w-20 h-20 rounded-full border-4 border-dashed border-brand-secondary/40 animate-spin flex items-center justify-center text-2xl">
            🦾
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black uppercase tracking-widest text-white font-heading">
              Arena Activation Hub
            </p>
            <p className="text-[11px] text-gray-500 font-mono font-bold">
              LOTTIE_ANIMATION_HOLDER_NODE
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Sign In Interactive Form Workspace (Spans 7) */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 md:p-20 relative z-10">
        <div className="w-full max-w-md space-y-8 bg-brand-dark border border-gray-700/20 rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Header Typography Label block */}
          <div className="space-y-2">
            <span className="text-[10px] font-black tracking-widest text-brand-secondary uppercase font-mono block">
              Identity Verification pass
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
              Welcome <span className="text-brand-secondary">Back</span>
            </h1>
            <p className="text-xs text-gray-400 font-normal">
              Input your credential parameters to access private routines and
              forum access threads.
            </p>
          </div>

          {/* Form Processing Core */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Field A: Email pass */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
                <HiOutlineMail className="text-brand-secondary text-sm" /> Email
                Address
              </label>
              <input
                type="email"
                required
                placeholder="developer@trfitness.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
              />
            </div>

            {/* Input Field B: Password pass */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
                <HiLockClosed className="text-brand-secondary text-sm" />{" "}
                Password Module
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
              />
            </div>

            {/* Submit Control Action Trigger */}
            <button
              type="submit"
              className="w-full bg-brand-secondary hover:bg-[#639396] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-brand-secondary/10 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              Sign In Arena <BsArrowRight className="text-sm" />
            </button>
          </form>

          {/* Context Footer Navigation Link */}
          <div className="text-center pt-2 border-t border-gray-800/60 text-xs text-gray-400 font-medium">
            New to the fitness environment?{" "}
            <Link
              href="/signUp"
              className="text-brand-secondary font-bold hover:underline"
            >
              Create Account Pass &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
