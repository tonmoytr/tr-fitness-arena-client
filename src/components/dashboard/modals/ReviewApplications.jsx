"use client";

import {
  HiOutlineXMark,
  HiOutlineCheck,
  HiOutlineXCircle,
} from "react-icons/hi2";

export default function ReviewApplicationModal({
  isOpen,
  onClose,
  application,
  onAction,
  isProcessing,
}) {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1c2127] border border-gray-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-fadeIn">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-white font-heading">
            Credential Verification Dossier
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <HiOutlineXMark size={18} />
          </button>
        </div>

        {/* Dossier Information Stack */}
        <div className="space-y-3 text-xs">
          <div className="bg-[#14181c] p-3 rounded-xl border border-gray-800/40">
            <span className="text-[9px] font-mono text-gray-500 uppercase block font-bold">
              Applicant Identity
            </span>
            <p className="text-white font-bold uppercase text-sm mt-0.5">
              {application.name}
            </p>
            <p className="text-gray-400 font-mono text-[11px]">
              {application.email}
            </p>
          </div>

          {/* <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#14181c] p-3 rounded-xl border border-gray-800/40">
              <span className="text-[9px] font-mono text-gray-500 uppercase block font-bold">
                Experience Log
              </span>
              <p className="text-brand-primary font-black uppercase tracking-wide mt-0.5">
                {application.experience || "0"} Years
              </p>
            </div>
            <div className="bg-[#14181c] p-3 rounded-xl border border-gray-800/40">
              <span className="text-[9px] font-mono text-gray-500 uppercase block font-bold">
                Weekly Slots
              </span>
              <p className="text-white font-bold font-mono mt-0.5">
                {application.slots || "0"} Available
              </p>
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#14181c] p-3 rounded-xl border border-gray-800/40">
              <span className="text-[9px] font-mono text-gray-500 uppercase block font-bold">
                Experience Log
              </span>
              <p className="text-brand-primary font-black uppercase tracking-wide mt-0.5">
                {application.experience || "0"} Years
              </p>
            </div>
            <div className="bg-[#14181c] p-3 rounded-xl border border-gray-800/40">
              <span className="text-[9px] font-mono text-gray-500 uppercase block font-bold">
                Specialty Focus
              </span>
              <p className="text-white font-bold font-mono mt-0.5 uppercase">
                {application.specialty || "General"}
              </p>
            </div>
          </div>

          <div className="bg-[#14181c] p-3 rounded-xl border border-gray-800/40 space-y-1">
            <span className="text-[9px] font-mono text-gray-500 uppercase block font-bold">
              Biography Summary
            </span>
            <p className="text-gray-300 font-normal leading-relaxed">
              {application.bio || "No summary profile provided."}
            </p>
          </div>
        </div>

        {/* Master Authorization Action Buttons */}
        <div className="flex gap-3 border-t border-gray-800 pt-4">
          <button
            onClick={() =>
              onAction(application._id, "rejected", application.email)
            }
            disabled={isProcessing}
            className="flex-1 bg-red-500/10 border border-red-500/20 text-red-400 font-mono font-black uppercase text-[10px] tracking-widest py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            <HiOutlineXCircle size={14} /> Reject
          </button>
          <button
            onClick={() =>
              onAction(application._id, "approved", application.email)
            }
            disabled={isProcessing}
            className="flex-1 bg-brand-primary text-white font-mono font-black uppercase text-[10px] tracking-widest py-3 rounded-xl hover:bg-emerald-600 transition-all shadow-lg cursor-pointer inline-flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            <HiOutlineCheck size={14} /> Approve & Promote
          </button>
        </div>
      </div>
    </div>
  );
}
