"use client";

import { useState } from "react";
import Link from "next/link";

import {
  HiOutlineFingerPrint,
  HiOutlineLockClosed,
  HiOutlineMailOpen,
  HiOutlineUser,
} from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future validation hook pipeline connection to Express /api/v1/auth/register
    console.log("Registration Payload Locked:", formData);
  };

  return (
    <main className="w-full min-h-screen bg-[#1b2026] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      {/* Left Column: Dedicated Animation Placeholder Slot (Spans 5) */}
      <div className="hidden lg:flex lg:col-span-5 bg-brand-dark relative items-center justify-center p-12 border-r border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-black/20" />

        {/* Lottie Animation Wrapper Container Slot */}
        <div className="w-full max-w-sm aspect-square bg-[#242b33] rounded-3xl border border-gray-700/30 flex flex-col items-center justify-center p-8 text-center space-y-4 shadow-inner">
          <div className="w-20 h-20 rounded-full border-4 border-dashed border-brand-primary/40 animate-spin flex items-center justify-center text-2xl">
            🔥
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black uppercase tracking-widest text-white font-heading">
              Onboarding Engine
            </p>
            <p className="text-[11px] text-gray-500 font-mono font-bold">
              LOTTIE_ANIMATION_HOLDER_NODE
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Sign Up Interactive Form Workspace (Spans 7) */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 md:p-16 relative z-10 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 bg-brand-dark border border-gray-700/20 rounded-3xl p-8 shadow-2xl my-8">
          {/* Header Typography Label block */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black tracking-widest text-brand-primary uppercase font-mono block">
              Join Platform System
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
              Create <span className="text-brand-primary">Account</span>
            </h1>
            <p className="text-xs text-gray-400 font-normal">
              Register your identity parameters to initialize your personal
              tracking logs.
            </p>
          </div>

          {/* Form Processing Core */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Field A: User Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
                <HiOutlineUser className="text-brand-primary text-sm" /> Full
                Identity Name
              </label>
              <input
                type="text"
                required
                placeholder="Tonmoy"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
              />
            </div>

            {/* Input Field B: Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
                <HiOutlineMailOpen className="text-brand-primary text-sm" />{" "}
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="developer@trfitness.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
              />
            </div>

            {/* Input Field C: Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
                <HiOutlineLockClosed className="text-brand-primary text-sm" />{" "}
                Set Access Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
              />
            </div>

            {/* Requirement Alignment Field D: Professional Role Selector Toggle Matrix */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
                <HiOutlineFingerPrint className="text-brand-primary text-sm" />{" "}
                Select Identity Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "user" })}
                  className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest font-mono transition-all cursor-pointer ${
                    formData.role === "user"
                      ? "bg-brand-primary text-white border-transparent shadow-md shadow-brand-primary/10"
                      : "bg-[#1b2026] border-gray-700/60 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  Standard Member
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "trainer" })}
                  className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest font-mono transition-all cursor-pointer ${
                    formData.role === "trainer"
                      ? "bg-brand-primary text-white border-transparent shadow-md shadow-brand-primary/10"
                      : "bg-[#1b2026] border-gray-700/60 text-gray-400 hover:border-gray-500"
                  }`}
                >
                  Apply As Trainer
                </button>
              </div>
            </div>

            {/* Submit Control Action Trigger */}
            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-[#e04e1d] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-brand-primary/10 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 pt-4"
            >
              Complete Registration <BsArrowRight className="text-sm" />
            </button>
          </form>

          {/* Context Footer Navigation Link */}
          <div className="text-center pt-2 border-t border-gray-800/60 text-xs text-gray-400 font-medium">
            Already verified inside the matrix?{" "}
            <Link
              href="/login"
              className="text-brand-primary font-bold hover:underline"
            >
              Sign In Here &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
