"use client";

import { useState, Suspense } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import {
  HiOutlineLockClosed,
  HiOutlineMailOpen,
  HiOutlineUser,
  HiOutlineCamera,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "", // Temporary text state placeholder before imgbb implementation
    password: "",
    role: "user", // Enforced static domain rule parameter
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. EXTRACTION: Grab the query parameter tracking token, fallback to /signIn if empty
  const callbackUrl = searchParams.get("callbackUrl") || "/signIn";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setIsLoading(true);

    // 1. Core Password Rules Validation Matrix
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(formData.password)) {
      setValidationError(
        "Password must be at least 6 characters long, contain at least one uppercase letter, and one lowercase letter.",
      );
      setIsLoading(false);
      return;
    }

    // 2. Direct Pipeline Connection to BetterAuth Server via Client SDK
    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        image: formData.image,
        password: formData.password,
        callbackURL: callbackUrl, // UPDATED: Dynamically uses the callback route
      });

      if (error) {
        // Catch BetterAuth SDK error blocks (e.g., Email Already Exists)
        setValidationError(
          error.message || "An authentication fault occurred.",
        );
        setIsLoading(false);
        return;
      }

      console.log("Account successfully provisioned into Atlas:", data);

      // UPDATED: Smoothly route the user to their original private target destination or login view
      router.push(callbackUrl);
    } catch (error) {
      console.error("SDK Pipeline Error:", error);
      setValidationError("Failed to communicate with authentication gateway.");
      setIsLoading(false);
    }
  };

  return (
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
          Register your identity parameters to initialize your personal tracking
          logs.
        </p>
      </div>

      {/* Core Validation Error Feedback Alert */}
      {validationError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 text-xs text-red-400 leading-relaxed font-mono">
          ⚠️ {validationError}
        </div>
      )}

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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
          />
        </div>

        {/* Input Field B: Email */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
            <HiOutlineMailOpen className="text-brand-primary text-sm" /> Email
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
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
          />
        </div>

        {/* Input Field C: Temporary Image URL Parameter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
            <HiOutlineCamera className="text-brand-primary text-sm" /> Profile
            Avatar URL
          </label>
          <input
            type="url"
            required
            placeholder="https://images.unsplash.com/...avatar.jpg"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
          />
        </div>

        {/* Input Field D: Password Layer with Eye Toggle Element */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
            <HiOutlineLockClosed className="text-brand-primary text-sm" /> Set
            Access Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl pl-4 pr-11 py-3 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-primary transition-colors cursor-pointer text-base"
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
          </div>
        </div>

        {/* Submit Control Action Trigger */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-brand-primary hover:bg-[#e04e1d] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-brand-primary/10 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-6 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading ? "Processing Registration..." : "Complete Registration"}{" "}
          <BsArrowRight className="text-sm" />
        </button>
      </form>

      {/* Context Footer Navigation Link: Pass forward the callback target string context safely */}
      <div className="text-center pt-2 border-t border-gray-800/60 text-xs text-gray-400 font-medium">
        Already verified inside the matrix?{" "}
        <Link
          href={`/signIn?callbackUrl=${encodeURIComponent(callbackUrl === "/signIn" ? "/" : callbackUrl)}`}
          className="text-brand-primary font-bold hover:underline"
        >
          Sign In Here &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <main className="w-full min-h-screen bg-[#1b2026] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
      {/* Left Column: Dedicated Animation Placeholder Slot (Spans 5) */}
      <div className="hidden lg:flex lg:col-span-5 bg-brand-dark relative items-center justify-center p-12 border-r border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-black/20" />

        {/* Lottie Animation Wrapper Container Slot */}
        <div className="w-full max-w-sm aspect-square bg-[#242b33] rounded-3xl border border-gray-700/30 flex flex-col items-center justify-center p-8 text-center space-y-4 shadow-inner">
          <div className="w-full h-full flex items-center justify-center">
            <DotLottieReact src="/animation/Login-Lady.json" loop autoplay />
          </div>
        </div>
      </div>

      {/* Right Column: Sign Up Interactive Form Workspace (Spans 7) */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 md:p-16 relative z-10 overflow-y-auto">
        <Suspense
          fallback={
            <div className="text-xs font-mono text-gray-500">
              Compiling Authentication Workspace Node...
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
      </div>
    </main>
  );
}
