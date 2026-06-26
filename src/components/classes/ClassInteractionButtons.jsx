"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { HiOutlineHeart, HiHeart, HiOutlineCreditCard } from "react-icons/hi2";
import { toast } from "sonner";

export default function ClassInteractionButtons({ classId }) {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;
  const router = useRouter();

  const [status, setStatus] = useState({
    alreadyBooked: false,
    isFavorite: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Read active collection constraints for this specific user on mount
  useEffect(() => {
    if (!currentUser) return;

    async function fetchUserClassStatus() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/classes/${classId}/status?userId=${currentUser.id}`,
        );
        if (res.ok) {
          const data = await res.json();
          setStatus(data);
        }
      } catch (err) {
        console.error("Error verifying interaction limits:", err);
      }
    }
    fetchUserClassStatus();
  }, [classId, currentUser]);

  // 1. ADD TO FAVORITES LOGIC PIPELINE
  const handleFavoriteClick = async () => {
    if (!currentUser) {
      toast.error("Authentication required to save favorites.");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/classes/favorites",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classId, userId: currentUser.id }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not modify favorites array.");
        return;
      }

      setStatus((prev) => ({ ...prev, isFavorite: true }));
      toast.success("Successfully added to your favorites!"); // Non-refreshing layout notification
    } catch (err) {
      toast.error("Network synchronization lost.");
    }
  };

  // 2. BOOK NOW GATEKEEPER FLOW
  const handleBookingClick = () => {
    if (!currentUser) {
      toast.error("Please log in to register for classes.");
      return;
    }

    if (status.alreadyBooked) {
      toast.error("You have already booked this class."); // Error toast block requirement
      return;
    }

    // Redirection: Send unbooked user down to Stripe checkout page
    router.push(`/payment?classId=${classId}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
      {/* BOOK NOW CTA BUTTON CONTROL */}
      <button
        onClick={handleBookingClick}
        disabled={status.alreadyBooked}
        className={`flex-1 font-black text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md transform hover:-translate-y-0.5 ${
          status.alreadyBooked
            ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/40"
            : "bg-brand-primary hover:bg-[#e04e1d] text-white cursor-pointer"
        }`}
      >
        <HiOutlineCreditCard className="text-sm" />
        {status.alreadyBooked ? "Already Booked" : "Book Class Session"}
      </button>

      {/* FAVORITES TOGGLE ACTION CONTROL */}
      <button
        onClick={handleFavoriteClick}
        disabled={status.isFavorite}
        className={`px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${
          status.isFavorite
            ? "bg-brand-secondary/10 border-brand-secondary text-brand-secondary cursor-not-allowed"
            : "border-gray-700 text-gray-400 hover:text-white hover:bg-[#242b33] cursor-pointer"
        }`}
      >
        {status.isFavorite ? (
          <HiHeart className="text-sm text-brand-secondary" />
        ) : (
          <HiOutlineHeart className="text-sm" />
        )}
        <span>
          {status.isFavorite ? "Saved To Favorites" : "Add To Favorites"}
        </span>
      </button>
    </div>
  );
}
