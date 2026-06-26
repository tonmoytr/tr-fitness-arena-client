"use client";

import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  className,
  isDeleting,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#1c2127] border border-gray-800 rounded-3xl max-w-sm w-full p-6 space-y-6 text-center shadow-2xl relative">
        <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto">
          <HiOutlineExclamationTriangle size={22} />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-black uppercase tracking-wide text-white font-heading">
            Confirm Erasure Gate
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed font-normal">
            Are you sure you want to delete{" "}
            <span className="text-white font-bold">{className}</span>? This
            layout parameter change is permanent.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 bg-[#242b33] border border-gray-700/60 text-gray-300 font-mono font-black uppercase text-[10px] tracking-widest py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-40"
          >
            Abort
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-500 text-white font-mono font-black uppercase text-[10px] tracking-widest py-3 rounded-xl hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-40"
          >
            {isDeleting ? "Wiping Entry..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
