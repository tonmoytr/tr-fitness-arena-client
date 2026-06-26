"use client";

import { HiOutlineXMark } from "react-icons/hi2";

export default function UpdateClassModal({
  isOpen,
  onClose,
  onSubmit,
  editFormData,
  setEditFormData,
  editSelectedDays,
  onDayToggle,
  isUpdating,
}) {
  if (!isOpen) return null;

  const availableDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1c2127] border border-gray-800 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-5 shadow-2xl relative my-8">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-white font-heading">
            Modify Routine Blueprint
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <HiOutlineXMark size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                Class Name
              </label>
              <input
                type="text"
                required
                value={editFormData.className}
                onChange={(e) =>
                  setEditFormData((p) => ({ ...p, className: e.target.value }))
                }
                className="w-full bg-[#14181c] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white outline-none focus:border-brand-secondary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                Image Resource URL
              </label>
              <input
                type="url"
                required
                value={editFormData.image}
                onChange={(e) =>
                  setEditFormData((p) => ({ ...p, image: e.target.value }))
                }
                className="w-full bg-[#14181c] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white outline-none focus:border-brand-secondary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                Category
              </label>
              <select
                value={editFormData.category}
                onChange={(e) =>
                  setEditFormData((p) => ({ ...p, category: e.target.value }))
                }
                className="w-full bg-[#14181c] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white font-mono uppercase font-black"
              >
                <option value="Yoga">Yoga</option>
                <option value="Weights">Weights</option>
                <option value="Cardio">Cardio</option>
                <option value="Crossfit">Crossfit</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                Difficulty
              </label>
              <select
                value={editFormData.difficultyLevel}
                onChange={(e) =>
                  setEditFormData((p) => ({
                    ...p,
                    difficultyLevel: e.target.value,
                  }))
                }
                className="w-full bg-[#14181c] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white font-mono uppercase font-black"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                Duration (Min)
              </label>
              <input
                type="number"
                required
                value={editFormData.duration}
                onChange={(e) =>
                  setEditFormData((p) => ({ ...p, duration: e.target.value }))
                }
                className="w-full bg-[#14181c] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={editFormData.price}
                onChange={(e) =>
                  setEditFormData((p) => ({ ...p, price: e.target.value }))
                }
                className="w-full bg-[#14181c] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                Execution Time
              </label>
              <input
                type="text"
                required
                value={editFormData.time}
                onChange={(e) =>
                  setEditFormData((p) => ({ ...p, time: e.target.value }))
                }
                className="w-full bg-[#14181c] border border-gray-800 rounded-xl px-3.5 py-3 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono block">
              Weekly Schedule Days
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableDays.map((day) => {
                const isChecked = editSelectedDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => onDayToggle(day)}
                    className={`px-3 py-1.5 text-[9px] font-mono font-black rounded-md border uppercase transition-all cursor-pointer ${isChecked ? "bg-brand-secondary/10 border-brand-secondary text-brand-secondary" : "border-gray-800 text-gray-500"}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">
              Description Summary
            </label>
            <textarea
              rows={3}
              required
              value={editFormData.description}
              onChange={(e) =>
                setEditFormData((p) => ({ ...p, description: e.target.value }))
              }
              className="w-full bg-[#14181c] border border-gray-800 rounded-xl p-3.5 text-xs text-white resize-none outline-none focus:border-brand-secondary"
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-brand-secondary hover:bg-[#5b898c] text-white font-mono font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg cursor-pointer disabled:opacity-40"
          >
            {isUpdating
              ? "Saving Structural Configurations..."
              : "Commit Dynamic System Adjustments"}
          </button>
        </form>
      </div>
    </div>
  );
}
