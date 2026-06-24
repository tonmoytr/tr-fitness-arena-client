"use client";

import { useState } from "react";
import {
  HiUserGroup,
  HiClock,
  HiStar,
  HiOutlineStar,
  HiMiniClock,
} from "react-icons/hi2";

export default function ClassBookingWidget({
  classId,
  price,
  schedule,
  bookingCount,
  duration,
}) {
  const [isBooked, setIsBooked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleBookingExecution = () => {
    if (isBooked) {
      triggerToast(
        "❌ Error: You have already locked your booking pass for this routine module.",
      );
      return;
    }
    triggerToast(
      "💳 Initializing routing sequence... Redirecting to Stripe Gateway secure link.",
    );
    setTimeout(() => setIsBooked(true), 2000);
  };

  return (
    <div className="bg-brand-dark border border-gray-700/40 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl">
      {/* Toast Alert Engine Overlay */}
      {toastMessage && (
        <div className="absolute top-4 left-4 right-4 bg-black border border-gray-700 text-white text-[11px] font-mono p-3.5 rounded-xl text-center shadow-2xl z-50">
          {toastMessage}
        </div>
      )}

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

      {/* Modern Mini Technical Horizontal Bar */}
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

      {/* Operational Core Call-To-Actions */}
      <div className="space-y-3">
        <button
          onClick={handleBookingExecution}
          disabled={isBooked}
          className={`w-full font-black text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all duration-300 transform cursor-pointer ${
            isBooked
              ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/20"
              : "bg-brand-primary hover:bg-[#e04e1d] text-white shadow-lg shadow-brand-primary/10 hover:-translate-y-0.5"
          }`}
        >
          {isBooked ? "Already Booked" : `Book Now Pass — $${price}`}
        </button>

        <button
          onClick={() => {
            setIsFavorited(!isFavorited);
            triggerToast(
              isFavorited
                ? "🗑️ Removed from favorites collection."
                : "🌟 Added to dashboard favorites!",
            );
          }}
          className={`w-full text-xs font-black uppercase tracking-widest py-3.5 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
            isFavorited
              ? "bg-transparent border-brand-primary text-brand-primary"
              : "bg-transparent border-gray-700 text-gray-300 hover:border-gray-500"
          }`}
        >
          {isFavorited ? (
            <HiStar className="text-sm" />
          ) : (
            <HiOutlineStar className="text-sm" />
          )}
          {isFavorited ? "Saved to Favorites" : "Add to Favorites"}
        </button>
      </div>

      {/* Calendar Specifications Meta Card */}
      <div className="bg-[#1b2026] border border-gray-700/30 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">
          <HiMiniClock className="text-xs text-brand-secondary" />
          Weekly Schedule Target
        </div>
        <p className="text-xs font-black text-white leading-relaxed">
          {schedule.days.join(", ")} at{" "}
          <span className="text-brand-secondary font-mono">
            {schedule.time}
          </span>
        </p>
      </div>
    </div>
  );
}
