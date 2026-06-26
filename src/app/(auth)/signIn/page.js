"use client";

import { useState, Suspense } from "react"; // 1. Bring in Suspense
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { HiLockClosed, HiOutlineMail } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { authClient } from "@/lib/auth-client"; // Use your actual auth-client path
import { toast } from "sonner";

// STEP 1: Move the entire login form logic here
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
        <h1 className="text-3xl font-black uppercase text-white">
          Welcome Back
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs text-gray-400 flex items-center gap-1.5">
            <HiOutlineMail className="text-brand-secondary" /> Email Address
          </label>
          <input
            type="email"
            required
            placeholder="developer@trfitness.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-[#1b2026] border border-gray-700/60 rounded-xl px-4 py-3 text-xs text-white outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-gray-400 flex items-center gap-1.5">
            <HiLockClosed className="text-brand-secondary" /> Password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full bg-[#1b2026] border border-gray-700/60 rounded-xl px-4 py-3 text-xs text-white outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-secondary text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

// STEP 2: The default export page wraps your form inside a Suspense boundary
export default function SigninPage() {
  return (
    <main className="w-full min-h-screen bg-[#1b2026] flex items-center justify-center p-6">
      <Suspense
        fallback={
          <div className="text-xs font-mono text-gray-400">
            Loading Network Parameters...
          </div>
        }
      >
        <SigninForm />
      </Suspense>
    </main>
  );
}
