import Link from "next/link";
import { FaChevronRight, FaCalendarAlt } from "react-icons/fa";

export default async function BookedClassesPage() {
  // Simulated database payload — will fetch from your Express server layer later
  const bookings = [
    {
      _id: "66790c1a0412a7bc8100ef22",
      className: "Fat Burn Cardio Circuit",
      trainer: "Sarah Jenkins",
      schedule: "Mon, Wed, Fri at 18:00",
    },
    {
      _id: "66790c1a0412a7bc8100ef31",
      className: "Barbell Snatch Mastery",
      trainer: "Marcus Vance",
      schedule: "Sat, Sun at 10:00 AM",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Page Header Context */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest font-mono block">
          Transaction Mapping
        </span>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-heading">
          Enrolled Modules Matrix
        </h1>
      </div>

      {/* 2. Dribbble-Style Responsive Data Table Frame */}
      <div className="bg-[#303841] border border-gray-700/30 rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            {/* Table Header Controls Grid */}
            <thead>
              <tr className="bg-[#242b33] border-b border-gray-800 text-[10px] font-black uppercase tracking-widest font-mono text-gray-400">
                <th className="p-5">Class Module Name</th>
                <th className="p-5">Assigned Lead Coach</th>
                <th className="p-5">Schedule Matrix Window</th>
                <th className="p-5 text-right">Actions Index</th>
              </tr>
            </thead>

            {/* Table Content Data Layer */}
            <tbody className="divide-y divide-gray-800/40 text-gray-300 font-medium">
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-12 text-center text-gray-500 font-mono"
                  >
                    No active class passes validated under this profile index.
                  </td>
                </tr>
              ) : (
                bookings.map((row) => (
                  <tr
                    key={row._id}
                    className="hover:bg-[#1f262f] transition-colors group"
                  >
                    {/* Class Name Cell */}
                    <td className="p-5 font-black text-white uppercase tracking-wide truncate max-w-[220px]">
                      {row.className}
                    </td>

                    {/* Trainer Assignment Cell */}
                    <td className="p-5 font-mono text-brand-secondary font-bold">
                      {row.trainer}
                    </td>

                    {/* Schedule Metrics Cell */}
                    <td className="p-5 text-gray-400 font-mono flex items-center gap-2 mt-0.5 border-none">
                      <FaCalendarAlt className="text-[10px] text-gray-600 group-hover:text-brand-secondary transition-colors" />
                      {row.schedule}
                    </td>

                    {/* Action Execution Button Cell */}
                    <td className="p-5 text-right">
                      <Link
                        href={`/classes/${row._id}`}
                        className="inline-flex items-center gap-1.5 bg-[#242b33] group-hover:bg-brand-primary border border-gray-700/40 group-hover:border-transparent text-gray-300 group-hover:text-white text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all font-mono cursor-pointer shadow-sm"
                      >
                        Launch Spec <FaChevronRight className="text-[7px]" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
