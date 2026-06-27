"use client";

import { useState } from "react";
import { HiOutlineXMark, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function RejectFeedbackModal({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
  applicantName,
}) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onConfirm(reason);
    setReason("");
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1c2127] border border-gray-800 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative animate-fadeIn">
        <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
          <div className="flex items-center gap-2 text-red-400">
            <HiOutlineChatBubbleLeftRight size={16} />
            <h3 className="text-xs font-black uppercase tracking-wider text-white font-heading">
              Rejection Feedback Log
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <HiOutlineXMark size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
              Reason for rejecting {applicantName}
            </label>
            <textarea
              required
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide clear architectural structural insights or missing credential guidelines..."
              className="w-full bg-[#14181c] border border-gray-700/60 focus:border-brand-primary rounded-xl p-3 text-xs text-white placeholder-gray-600 resize-none outline-none font-sans"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 bg-[#242b33] border border-gray-700/60 text-gray-300 font-mono font-black uppercase text-[10px] tracking-widest py-3 rounded-xl cursor-pointer disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || !reason.trim()}
              className="flex-1 bg-red-500 text-white font-mono font-black uppercase text-[10px] tracking-widest py-3 rounded-xl hover:bg-red-600 transition-colors shadow-lg cursor-pointer disabled:opacity-40"
            >
              {isProcessing ? "Submitting..." : "Confirm Reject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
