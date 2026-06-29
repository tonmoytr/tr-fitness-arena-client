"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function SigninForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Invalid credentials provided.");
        setIsLoading(false);
        return;
      }

      if (data) {
        toast.success("Authentication validated! Entering arena...");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Sign-in Pipeline Exception:", err);
      toast.error("Internal application sync failure.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-brand-dark border border-gray-700/20 rounded-3xl p-8 shadow-2xl">
      <div className="space-y-2">
        <span className="text-[10px] font-black tracking-widest text-brand-secondary uppercase font-mono block">
          Access Platform System
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Welcome <span className="text-brand-secondary">Back</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal">
          Enter your identity parameters to synchronize with your physical training profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
            <HiOutlineMail className="text-brand-secondary text-sm" /> Email Address
          </label>
          <input
            type="email"
            required
            placeholder="developer@trfitness.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
            <HiLockClosed className="text-brand-secondary text-sm" /> Password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-brand-secondary hover:bg-[#629295] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-brand-secondary/15 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-6 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading ? "Verifying..." : "Sign In"} <BsArrowRight className="text-sm" />
        </button>
      </form>

      {/* Context Footer Navigation Link */}
      <div className="text-center pt-2 border-t border-gray-800/60 text-xs text-gray-400 font-medium">
        New to the arena?{" "}
        <Link
          href={`/signUp?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="text-brand-secondary font-bold hover:underline"
        >
          Create Account &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function SigninPage() {
  return (
    <main className="w-full min-h-screen bg-[#1b2026] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      {/* Left Column: Dedicated Animation Placeholder Slot (Spans 5) */}
      <div className="hidden lg:flex lg:col-span-5 bg-brand-dark relative items-center justify-center p-12 border-r border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 via-transparent to-black/20" />

        {/* Lottie Animation Wrapper Container */}
        <div className="w-full max-w-sm aspect-square bg-[#242b33] rounded-3xl border border-gray-700/30 flex flex-col items-center justify-center p-8 text-center space-y-4 shadow-inner">
          <div className="w-full h-full flex items-center justify-center">
            <DotLottieReact src="/animation/login.json" loop autoplay />
          </div>
        </div>
      </div>

      {/* Right Column: Sign In Interactive Form Workspace (Spans 7) */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 md:p-16 relative z-10 overflow-y-auto">
        <Suspense
          fallback={
            <div className="text-xs font-mono text-gray-500">
              Compiling Authentication Workspace Node...
            </div>
          }
        >
          <SigninForm />
        </Suspense>
      </div>
    </main>
  );
}
