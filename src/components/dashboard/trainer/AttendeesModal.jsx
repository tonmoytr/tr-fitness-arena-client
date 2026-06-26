"use client";

export default function AttendeesModal({ isOpen, onClose, attendees }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-brand-dark border border-gray-800 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative animate-fadeIn">
        <h3 className="text-sm font-black uppercase tracking-wider font-heading text-white border-b border-gray-800 pb-3">
          Enrolled Student Registers
        </h3>
        {attendees.length === 0 ? (
          <p className="text-xs font-mono text-gray-500 py-4 text-center">
            No active student allocations recorded for this module block.
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {attendees.map((stu, i) => (
              <div
                key={i}
                className="bg-[#1b2026] border border-gray-800/40 p-3 rounded-xl flex flex-col"
              >
                <span className="text-xs font-black text-white uppercase tracking-wide">
                  {stu.name}
                </span>
                <span className="text-[10px] font-mono text-gray-500">
                  {stu.email}
                </span>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full bg-[#242b33] text-gray-300 font-mono font-black uppercase text-[10px] tracking-widest py-3 rounded-xl hover:text-white transition-colors cursor-pointer"
        >
          Close Auditor Dashboard
        </button>
      </div>
    </div>
  );
}
