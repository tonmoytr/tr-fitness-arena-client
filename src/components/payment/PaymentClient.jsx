"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  HiArrowLeft,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineUser,
} from "react-icons/hi2";
import { toast } from "sonner";

export default function PaymentClient({ fitnessClass, currentUser }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    _id: classId,
    className,
    price,
    image,
    duration,
    trainer,
    classSchedule,
  } = fitnessClass;

  const handleCheckout = async () => {
    setIsProcessing(true);
    const toastId = toast.loading("Creating secure Stripe checkout session...");

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId,
          className,
          price,
          image,
          userId: currentUser.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initialize checkout.");
      }

      toast.success("Redirecting to Stripe Gateway...", { id: toastId });

      // Redirect directly to Stripe-hosted Checkout Page
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout redirection error:", err);
      toast.error(err.message || "An unexpected gateway error occurred.", {
        id: toastId,
      });
      setIsProcessing(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#1b2026] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation back button */}
        <div>
          <Link
            href={`/classes/${classId}`}
            className="inline-flex items-center gap-2 bg-[#242b33] border border-gray-700/50 hover:border-gray-500 text-[11px] font-black uppercase tracking-wider text-gray-200 px-4 py-2.5 rounded-xl transition-all"
          >
            <HiArrowLeft className="text-sm stroke-[2.5]" />
            Return to Class Details
          </Link>
        </div>

        {/* Header Title Section */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-black text-brand-secondary uppercase tracking-widest block">
            Payment Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading">
            Confirm & <span className="text-brand-primary">Secure Slot</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-xl">
            You are about to register for an elite gym module session. Review
            your summary details below to checkout via Stripe.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Summary Card */}
          <div className="md:col-span-7 bg-[#242b33] border border-gray-700/40 rounded-3xl overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-dark border border-gray-700/30">
              <img
                src={image}
                alt={className}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-black text-white uppercase tracking-tight font-heading">
                {className}
              </h2>

              <div className="divide-y divide-gray-800 text-sm">
                {/* Trainer Info */}
                <div className="py-3 flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <HiOutlineUser className="text-brand-secondary text-base" />
                    Lead Coach
                  </span>
                  <span className="font-bold text-white uppercase tracking-wide">
                    {trainer?.name || "Lead Coach"}
                  </span>
                </div>

                {/* Duration Info */}
                <div className="py-3 flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <HiOutlineClock className="text-brand-secondary text-base" />
                    Class Duration
                  </span>
                  <span className="font-mono font-bold text-white">
                    {duration} Minutes
                  </span>
                </div>

                {/* Schedule Info */}
                <div className="py-3 flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <HiOutlineCalendar className="text-brand-secondary text-base" />
                    Schedule Weekly
                  </span>
                  <span className="text-right text-white font-medium">
                    {classSchedule?.days?.join(", ")} at {classSchedule?.time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Details & Checkout Trigger */}

          <div className="md:col-span-5 bg-[#242b33] border border-gray-700/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-sm font-mono font-black uppercase tracking-widest text-gray-400 border-b border-gray-800 pb-3">
              Registration Fee
            </h3>

            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-400 font-mono uppercase">
                Total Due:
              </span>
              <span className="text-4xl font-black text-brand-primary font-heading">
                ${price}
              </span>
            </div>

            {/* <div className="bg-[#1b2026] border border-gray-700/30 rounded-2xl p-4 text-xs text-gray-400 space-y-2 font-mono leading-relaxed">
              <p>🔒 256-bit Secure Sockets Layer Encryption</p>
              <p>
                🔄 Free returns / session rescheduling triggers subject to coach
                notice guidelines.
              </p>
            </div> */}

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full font-black text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all duration-300 transform flex items-center justify-center gap-2 ${
                isProcessing
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/20"
                  : "bg-brand-primary hover:bg-[#e04e1d] text-white shadow-lg shadow-brand-primary/10 hover:-translate-y-0.5 cursor-pointer"
              }`}
            >
              <HiOutlineCreditCard className="text-base" />
              {isProcessing ? "Processing..." : `Checkout via Stripe`}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
