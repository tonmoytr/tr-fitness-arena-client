"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";
import AttendeesModal from "./AttendeesModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import UpdateClassModal from "./UpdateClassModal";
import { HiOutlineTrash, HiOutlineUsers } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Link from "next/link";

// Clean Sub-Component Modal Sheet Hooks

export default function TrainerClassesTableClient() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // States handling isolated views
  const [isAttendeesOpen, setIsAttendeesOpen] = useState(false);
  const [activeAttendees, setActiveAttendees] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [updatingClass, setUpdatingClass] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [editFormData, setEditFormData] = useState({
    className: "",
    image: "",
    category: "Weights",
    difficultyLevel: "Intermediate",
    duration: "60",
    price: "",
    description: "",
    time: "08:00 AM",
  });
  const [editSelectedDays, setEditSelectedDays] = useState([]);

  useEffect(() => {
    if (currentUser) fetchMyClasses();
  }, [currentUser]);

  async function fetchMyClasses() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/my-classes?trainerId=${currentUser.id}`,
      );
      if (res.ok) setClasses(await res.json());
    } catch (err) {
      console.error("Error retrieving dashboard records:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/classes/${classToDelete._id}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        setClasses((prev) =>
          prev.filter((item) => item._id !== classToDelete._id),
        );
        toast.success("Routine blueprint dropped cleanly from registry index.");
        setIsDeleteOpen(false);
      }
    } catch (err) {
      toast.error("Network packet drop timeout.");
    } finally {
      setIsDeleting(false);
      setClassToDelete(null);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/classes/${updatingClass._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editFormData, days: editSelectedDays }),
        },
      );
      if (res.ok) {
        toast.success("Routine structural adjustments saved!");
        setIsUpdateOpen(false);
        fetchMyClasses();
      }
    } catch (err) {
      toast.error("Communication pipeline bottleneck.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading)
    return (
      <div className="text-center font-mono text-xs text-gray-500 animate-pulse py-12">
        Querying running class directories...
      </div>
    );

  return (
    <div className="space-y-6">
      {classes.length === 0 ? (
        <div className="bg-brand-dark border border-gray-800/60 rounded-3xl p-12 text-center max-w-md mx-auto relative overflow-hidden shadow-2xl group">
          {/* High-impact top accent line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-secondary/40 to-transparent" />

          <div className="space-y-6 relative z-10">
            {/* Clean Minimal Icon Shield */}
            <div className="w-14 h-14 bg-[#242b33]/60 border border-gray-800 rounded-2xl flex items-center justify-center text-gray-500 mx-auto group-hover:border-brand-secondary/30 group-hover:text-brand-secondary transition-all duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>

            {/* Typography Hierarchy */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-white font-heading">
                Inventory Registry Empty
              </h3>
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-[280px] mx-auto font-normal">
                You haven&apos;t built or deployed any dynamic fitness routine
                modules to the platform directory yet.
              </p>
            </div>

            {/* Pro-Spec Action Node Trigger Link */}
            <div className="pt-2">
              <Link
                href="/dashboard/add-class"
                className="inline-flex items-center gap-2 bg-[#242b33] border border-gray-700/60 hover:border-brand-secondary hover:text-brand-secondary text-gray-300 text-[10px] font-mono font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all duration-200"
              >
                <span>Deploy First Blueprint</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-brand-dark border border-gray-700/30 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#242b33]/40 text-[10px] font-mono font-black uppercase tracking-widest text-gray-400">
                <th className="p-5">Routine Details</th>
                <th className="p-5">Price Matrix</th>
                <th className="p-5">Moderation Status</th>
                <th className="p-5 text-right">Actions Panel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-xs text-gray-300">
              {classes.map((cls) => (
                <tr
                  key={cls._id}
                  className="hover:bg-[#242b33]/20 transition-colors"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-900 overflow-hidden border border-gray-800">
                        <img
                          src={cls.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-black text-white uppercase font-heading tracking-wide truncate max-w-[180px]">
                          {cls.className}
                        </h4>
                        <span className="text-[9px] font-mono font-bold text-gray-500 block uppercase tracking-wider">
                          {cls.category} — {cls.difficultyLevel}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 font-mono font-bold text-gray-400">
                    ${parseFloat(cls.price).toFixed(2)}
                  </td>
                  <td className="p-5">
                    <span
                      className={`text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${cls.status === "pending" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : cls.status === "rejected" ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"}`}
                    >
                      {cls.status}
                    </span>
                  </td>
                  <td className="p-5 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setActiveAttendees(
                          cls.bookingCount > 0
                            ? [{ name: "John Doe", email: "johndoe@gmail.com" }]
                            : [],
                        );
                        setIsAttendeesOpen(true);
                      }}
                      className="p-2 bg-[#242b33] border border-gray-700/60 text-gray-400 hover:text-brand-secondary rounded-xl cursor-pointer inline-flex items-center gap-1.5 text-[10px] font-mono font-black px-3"
                    >
                      <HiOutlineUsers size={12} /> ({cls.bookingCount || 0})
                    </button>
                    <button
                      onClick={() => {
                        setUpdatingClass(cls);
                        setEditFormData({
                          className: cls.className,
                          image: cls.image,
                          category: cls.category,
                          difficultyLevel: cls.difficultyLevel,
                          duration: cls.duration?.toString(),
                          price: cls.price?.toString(),
                          description: cls.description,
                          time: cls.classSchedule?.time,
                        });
                        setEditSelectedDays(cls.classSchedule?.days || []);
                        setIsUpdateOpen(true);
                      }}
                      className="p-2 bg-[#242b33] border border-gray-700/60 text-gray-400 hover:text-white rounded-xl cursor-pointer inline-flex"
                    >
                      <HiOutlinePencilSquare size={13} />
                    </button>
                    <button
                      onClick={() => {
                        setClassToDelete(cls);
                        setIsDeleteOpen(true);
                      }}
                      className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl cursor-pointer inline-flex"
                    >
                      <HiOutlineTrash size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Extracted Sub-View Modal Sheets Container Elements */}
      <AttendeesModal
        isOpen={isAttendeesOpen}
        onClose={() => setIsAttendeesOpen(false)}
        attendees={activeAttendees}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        className={classToDelete?.className}
        isDeleting={isDeleting}
      />
      <UpdateClassModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onSubmit={handleUpdateSubmit}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        editSelectedDays={editSelectedDays}
        onDayToggle={(day) =>
          setEditSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
          )
        }
        isUpdating={isUpdating}
      />
    </div>
  );
}
