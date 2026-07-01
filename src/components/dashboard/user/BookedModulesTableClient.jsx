"use client";

import { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { toast } from "sonner";

export default function BookedModulesTableClient() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;
  const searchParams = useSearchParams();

  const [bookedClasses, setBookedClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  
  // Use a ref to ensure we only attempt payment confirmation once
  const confirmedRef = useRef(false);

  const fetchBookedModules = async (userId) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${BASE_URL}/bookings?userId=${userId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Could not pull booking ledgers from backend.");
      }

      const data = await res.json();
      setBookedClasses(data);
    } catch (err) {
      console.error("Booking logs fetching crash:", err);
      toast.error("Could not fetch your active class bookings.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const sessionId = searchParams.get("session_id");

    const handleConfirmAndFetch = async () => {
      // 1. If we have a Stripe checkout session ID in URL, trigger payment confirmation
      if (sessionId && !confirmedRef.current) {
        confirmedRef.current = true;
        setIsConfirming(true);
        const toastId = toast.loading("Verifying transaction with Stripe...");

        try {
          const res = await fetch("/api/checkout_sessions/confirm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "Confirmation process failed.");
          }

          toast.success("Spot reservation successfully secured!", { id: toastId });
          
          // Clear query parameters from URL bar to prevent confirmation on refresh
          window.history.replaceState({}, "", "/dashboard/booked");
        } catch (err) {
          console.error("Confirmation error:", err);
          toast.error(err.message || "Payment verification failed.", { id: toastId });
        } finally {
          setIsConfirming(false);
        }
      }

      // 2. Fetch the latest live bookings from backend
      await fetchBookedModules(currentUser.id);
    };

    handleConfirmAndFetch();
  }, [currentUser, searchParams]);

  if (isLoading || isConfirming) {
    return (
      <div className="text-center font-mono text-xs text-gray-500 animate-pulse py-12">
        {isConfirming
          ? "Securing slot reservation ledger with Stripe..."
          : "Sifting active registration ledgers..."}
      </div>
    );
  }

  if (bookedClasses.length === 0) {
    return (
      <div className="bg-brand-dark border border-gray-700/20 rounded-3xl p-12 text-center text-xs text-gray-400 max-w-md mx-auto space-y-4">
        <p className="font-mono">
          You do not have any registered training clearances locked in yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark border border-gray-700/30 rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#242b33]/40 text-[10px] font-mono font-black uppercase tracking-widest text-gray-400">
              <th className="p-4 sm:p-5">Routine Module / Class</th>
              <th className="p-4 sm:p-5">Assigned Coach</th>
              <th className="p-4 sm:p-5">Calendar Schedule</th>
              <th className="p-4 sm:p-5 text-right">View Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 text-xs text-gray-300">
            {bookedClasses.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-[#242b33]/20 transition-colors group"
              >
                <td className="p-4 sm:p-5 font-black text-white uppercase font-heading tracking-wide">
                  {item.className}
                </td>
                <td className="p-4 sm:p-5 text-gray-400 font-medium">
                  {item.trainerName}
                </td>
                <td className="p-4 sm:p-5 font-mono text-brand-secondary font-bold flex items-center gap-1.5 pt-6">
                  <IoCalendarNumberOutline size={13} /> {item.schedule}
                </td>
                <td className="p-4 sm:p-5 text-right">
                  <Link
                    href={`/classes/${item.classId}`}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-widest bg-[#242b33] text-gray-300 border border-gray-700/60 hover:border-brand-secondary hover:text-brand-secondary px-3.5 py-2 rounded-xl transition-all"
                  >
                    Inspect <HiArrowTopRightOnSquare size={11} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
