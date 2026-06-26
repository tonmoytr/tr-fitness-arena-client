"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

export default function BookedModulesTableClient() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [bookedClasses, setBookedClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    async function fetchBookedModules() {
      try {
        // Initial setup data matching table schema criteria[cite: 6]
        const mockBookingsData = [
          {
            _id: "b1",
            className: "Hypertrophy Strength System",
            trainerName: "Sarah Jenkins",
            schedule: "Mon, Wed at 08:00 AM",
            classId: "66790d0f",
          },
          {
            _id: "b2",
            className: "Core Vinyasa Flow",
            trainerName: "David Miller",
            schedule: "Tue, Thu at 06:00 PM",
            classId: "66793e55",
          },
        ];

        setBookedClasses(mockBookingsData);
      } catch (err) {
        console.error("Booking logs fetching crash:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookedModules();
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="text-center font-mono text-xs text-gray-500 animate-pulse py-12">
        Sifting active registration ledgers...
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
