"use client";

import { useState } from "react";
import {
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineTrash,
  HiOutlineFunnel,
} from "react-icons/hi2";
import { toast } from "sonner";

export default function AdminClassesClient({ initialClasses }) {
  const [classesList, setClassesList] = useState(initialClasses);
  const [processingId, setProcessingId] = useState(null);

  // 1. FILTERING STATES
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // 2. STATUS MUTATION HANDLERS
  const handleUpdateStatus = async (classId, targetStatus) => {
    setProcessingId(classId);
    const loadingToast = toast.loading(
      `Transitioning routine clearance status to ${targetStatus}...`,
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/classes/${classId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: targetStatus }),
        },
      );

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success(
          `Routine matrix status marked as ${targetStatus} successfully.`,
        );
        setClassesList((prev) =>
          prev.map((item) =>
            item._id === classId ? { ...item, status: targetStatus } : item,
          ),
        );
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to commit moderation status adjustment.");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Network synchronization anomaly encountered.");
    } finally {
      setProcessingId(null);
    }
  };

  // 3. PURGE COMMAND HANDLER
  const handleDeleteClass = async (classId) => {
    if (
      !confirm(
        "Are you certain you want to permanently purge this training routine documentation block from active nodes?",
      )
    )
      return;

    setProcessingId(classId);
    const loadingToast = toast.loading(
      "Executing terminal document purge sequence...",
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/classes/${classId}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success(
          "Routine permanently removed from system database files.",
        );
        setClassesList((prev) => prev.filter((item) => item._id !== classId));
      } else {
        toast.dismiss(loadingToast);
        toast.error("Database layer rejected deletion target.");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Network communication failure during deletion task.");
    } finally {
      setProcessingId(null);
    }
  };

  // 4. RUNTIME MEMORY FILTER COMPUTATION
  const filteredClasses = classesList.filter((item) => {
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* PREMIUM CONTROLS FILTER BAR */}
      <div className="bg-[#242b33]/30 border border-gray-800/60 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-400 font-mono text-[10px] font-bold uppercase tracking-wider">
          <HiOutlineFunnel className="text-brand-secondary text-sm" />
          Filter Matrix Engine
        </div>

        <div className="flex items-center gap-3">
          {/* Status Selection Node */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono font-bold uppercase text-gray-500">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#1b2026] border border-gray-700/60 text-gray-300 focus:border-brand-secondary rounded-xl px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider outline-none cursor-pointer transition-all"
            >
              <option value="all">All Logs</option>
              <option value="pending">Pending Only</option>
              <option value="approved">Approved Only</option>
              <option value="rejected">Rejected Only</option>
            </select>
          </div>

          {/* Category Selection Node */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono font-bold uppercase text-gray-500">
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#1b2026] border border-gray-700/60 text-gray-300 focus:border-brand-secondary rounded-xl px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider outline-none cursor-pointer transition-all"
            >
              <option value="all">All Tiers</option>
              <option value="Weights">Weights</option>
              <option value="Cardio">Cardio</option>
              <option value="Yoga">Yoga</option>
              <option value="Crossfit">Crossfit</option>
            </select>
          </div>
        </div>
      </div>

      {/* CORE DATA LEDGER GRID */}
      <div className="bg-brand-dark border border-gray-700/30 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#242b33]/40 text-[10px] font-mono font-black uppercase tracking-widest text-gray-400">
                <th className="p-5">Routine Details</th>
                <th className="p-5">Coach Credentials</th>
                <th className="p-5">Schedule & Matrix Pricing</th>
                <th className="p-5">Status Log</th>
                <th className="p-5 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-xs text-gray-300">
              {filteredClasses.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-gray-500 italic font-mono"
                  >
                    No template items match current active selection parameters.
                  </td>
                </tr>
              ) : (
                filteredClasses.map((classItem) => (
                  <tr
                    key={classItem._id}
                    className="hover:bg-[#242b33]/10 transition-colors"
                  >
                    {/* 1. Class Info */}
                    <td className="p-5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 overflow-hidden shrink-0 shadow-inner">
                          <img
                            src={classItem.image}
                            alt={classItem.className}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-black text-white uppercase tracking-wide font-heading">
                            {classItem.className}
                          </h4>
                          <div className="flex gap-1.5 mt-0.5">
                            <span className="text-[8px] font-mono font-bold bg-brand-secondary/5 border border-brand-secondary/20 text-brand-secondary px-1.5 py-0.2 rounded uppercase tracking-wider">
                              {classItem.category}
                            </span>
                            <span className="text-[8px] font-mono font-bold bg-gray-800 border border-gray-700 text-gray-400 px-1.5 py-0.2 rounded uppercase tracking-wider">
                              {classItem.difficultyLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Coach Profile */}
                    <td className="p-5">
                      <div className="space-y-0.5">
                        <h5 className="font-bold text-gray-200 uppercase tracking-wide">
                          {classItem.trainerName}
                        </h5>
                        <span className="text-[10px] font-mono text-gray-500 block">
                          {classItem.trainerEmail}
                        </span>
                      </div>
                    </td>

                    {/* 3. Schedule Metrics */}
                    <td className="p-5 font-mono text-[11px]">
                      <div className="space-y-0.5 text-gray-400">
                        <div>
                          🕒{" "}
                          <span className="text-white font-bold">
                            {classItem.time}
                          </span>{" "}
                          ({classItem.duration} Mins)
                        </div>
                        <div className="text-[10px]">
                          🗓️{" "}
                          <span className="text-brand-secondary uppercase font-black">
                            {classItem.days?.join(", ")}
                          </span>
                        </div>
                        <div className="text-[10px] text-emerald-400 font-bold mt-1">
                          💵 Fee Matrix: ${Number(classItem.price).toFixed(2)}
                        </div>
                      </div>
                    </td>

                    {/* 4. Moderation Status Log */}
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                          classItem.status === "approved"
                            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                            : classItem.status === "rejected"
                              ? "bg-red-500/5 border-red-500/20 text-red-400"
                              : "bg-amber-500/5 border-amber-500/20 text-amber-400"
                        }`}
                      >
                        {classItem.status}
                      </span>
                    </td>

                    {/* 5. Moderation Controls Cluster */}
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {classItem.status === "pending" && (
                          <>
                            <button
                              disabled={processingId !== null}
                              onClick={() =>
                                handleUpdateStatus(classItem._id, "approved")
                              }
                              className="w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer disabled:opacity-30"
                              title="Approve Routine Module"
                            >
                              <HiOutlineCheck size={14} />
                            </button>

                            <button
                              disabled={processingId !== null}
                              onClick={() =>
                                handleUpdateStatus(classItem._id, "rejected")
                              }
                              className="w-7 h-7 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-white transition-all cursor-pointer disabled:opacity-30"
                              title="Reject Routine Module"
                            >
                              <HiOutlineXMark size={14} />
                            </button>
                          </>
                        )}

                        <button
                          disabled={processingId !== null}
                          onClick={() => handleDeleteClass(classItem._id)}
                          className="w-7 h-7 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer disabled:opacity-30"
                          title="Delete Routine Permanently"
                        >
                          <HiOutlineTrash size={14} />
                        </button>
                      </div>
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
