"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client"; // Real authentic tracking bridge
import { useRouter } from "next/navigation";
import {
  HiUserGroup,
  HiClock,
  HiStar,
  HiOutlineStar,
  HiMiniClock,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import { toast } from "sonner";

export default function ClassBookingWidget({
  classId,
  price,
  schedule,
  bookingCount,
  duration,
}) {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;
  const router = useRouter();

  // Real collection restriction status matrices
  const [dbStatus, setDbStatus] = useState({
    alreadyBooked: false,
    isFavorite: false,
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. DATA SYNC: Read collection conditions on mount for logged-in user
  useEffect(() => {
    if (!currentUser) return;

    async function fetchUserClassStatus() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/classes/${classId}/status?userId=${currentUser.id}`,
        );
        if (res.ok) {
          const data = await res.json();
          setDbStatus(data);
        }
      } catch (err) {
        console.error("Verification loop failure:", err);
      }
    }
    fetchUserClassStatus();
  }, [classId, currentUser]);

  // 2. REAL BOOKING ACTION CONTROLLER
  const handleBookingExecution = () => {
    if (!currentUser) {
      toast.error("Please log in to register for gym sessions.");
      return;
    }

    if (dbStatus.alreadyBooked) {
      toast.error(
        "❌ Error: You have already locked your booking pass for this routine module.",
      );
      return;
    }

    toast.info(
      "💳 Initializing routing sequence... Redirecting to Stripe Gateway secure link.",
    );

    // Dynamic routing path to your checkout system passing target parameters
    router.push(`/payment?classId=${classId}`);
  };

  // 3. REAL FAVORITES CRUD OPERATION
  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      toast.error("Authentication parameters missing. Please log in.");
      return;
    }

    setIsSyncing(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classes/favorites`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classId, userId: currentUser.id }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not execute mutation.");
        return;
      }

      setDbStatus((prev) => ({ ...prev, isFavorite: true }));
      toast.success("🌟 Successfully added to your dashboard favorites!");
    } catch (err) {
      toast.error("Connection matrix timeout.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="bg-brand-dark border border-gray-700/40 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
      {/* Financial Pass Pricing Block */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-700/60">
        <div>
          <span className="text-[9px] text-gray-400 block uppercase font-black tracking-widest font-mono">
            Access Pricing
          </span>
          <span className="text-4xl font-black text-brand-primary font-heading">
            ${price}
          </span>
        </div>
        <div className="text-right bg-[#242b33] border border-gray-700/40 px-3 py-1.5 rounded-xl">
          <span className="text-[9px] text-brand-secondary block uppercase font-black tracking-widest font-mono">
            Velocity Length
          </span>
          <span className="text-xs font-mono font-black text-white">
            {duration} mins
          </span>
        </div>
      </div>

      {/* Mini Technical Horizon Status Bar */}
      <div className="bg-[#1b2026] rounded-xl px-4 py-3 border border-gray-700/20 flex items-center justify-between text-xs font-mono font-bold text-gray-400">
        <div className="flex items-center gap-1.5">
          <HiUserGroup className="text-sm text-brand-secondary" />
          <span>{bookingCount} booked</span>
        </div>
        <div className="w-[1px] h-4 bg-gray-700" />
        <div className="flex items-center gap-1.5">
          <HiClock className="text-sm text-brand-secondary" />
          <span>{duration} mins</span>
        </div>
      </div>

      {/* Operational Core Call-To-Actions (Now Bound to Real Backend Pipelines) */}
      <div className="space-y-3">
        <button
          onClick={handleBookingExecution}
          disabled={dbStatus.alreadyBooked}
          className={`w-full font-black text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all duration-300 transform flex items-center justify-center gap-2 ${
            dbStatus.alreadyBooked
              ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/20"
              : "bg-brand-primary hover:bg-[#e04e1d] text-white shadow-lg shadow-brand-primary/10 hover:-translate-y-0.5 cursor-pointer"
          }`}
        >
          <HiOutlineCreditCard className="text-sm" />
          {dbStatus.alreadyBooked
            ? "Already Booked"
            : `Book Now Pass — $${price}`}{" "}
        </button>

        <button
          onClick={handleFavoriteToggle}
          disabled={dbStatus.isFavorite || isSyncing}
          className={`w-full text-xs font-black uppercase tracking-widest py-3.5 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
            dbStatus.isFavorite
              ? "bg-brand-secondary/10 border-brand-secondary text-brand-secondary cursor-not-allowed"
              : "bg-transparent border-gray-700 text-gray-300 hover:border-gray-500 cursor-pointer"
          }`}
        >
          {dbStatus.isFavorite ? (
            <HiStar className="text-sm text-brand-secondary" />
          ) : (
            <HiOutlineStar className="text-sm" />
          )}
          {dbStatus.isFavorite ? "Saved to Favorites" : "Add to Favorites"}{" "}
        </button>
      </div>

      {/* Calendar Specifications Meta Card */}
      <div className="bg-[#1b2026] border border-gray-700/30 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">
          <HiMiniClock className="text-xs text-brand-secondary" />
          Weekly Schedule Target
        </div>
        <p className="text-xs font-black text-white leading-relaxed">
          {schedule?.days?.join(", ")} at{" "}
          <span className="text-brand-secondary font-mono">
            {schedule?.time}
          </span>
        </p>
      </div>
    </div>
  );
}
