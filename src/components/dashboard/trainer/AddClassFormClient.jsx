"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { toast } from "sonner";

export default function AddClassFormClient() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    image: "",
    category: "Weights",
    difficultyLevel: "Intermediate",
    duration: "60",
    price: "",
    description: "",
    time: "08:00 AM",
  });

  const [selectedDays, setSelectedDays] = useState([]);
  const availableDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleDayCheckbox = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (selectedDays.length === 0) {
      toast.error(
        "Please allocate at least one target day to the weekly schedule chart.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // FIXED: Corrected the template literal string syntax below
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/classes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            days: selectedDays,
            trainerId: currentUser.id,
            trainerName: currentUser.name,
            trainerEmail: currentUser.email,
          }),
        },
      );

      if (res.ok) {
        toast.success(
          "🚀 Routine added successfully! Pushed to pending moderation logs.",
        );
        setFormData({
          className: "",
          image: "",
          category: "Weights",
          difficultyLevel: "Intermediate",
          duration: "60",
          price: "",
          description: "",
          time: "08:00 AM",
        });
        setSelectedDays([]);
      } else {
        toast.error(
          "Failed to commit configuration to backend infrastructure node.",
        );
      }
    } catch (err) {
      toast.error("Network communication matrix fault.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-brand-dark border border-gray-700/30 rounded-3xl p-6 md:p-8 space-y-5 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-secondary via-transparent to-transparent" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Class Name
          </label>
          <input
            type="text"
            name="className"
            required
            value={formData.className}
            onChange={handleInputChange}
            placeholder="e.g., Tactical Conditioning"
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            required
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white font-mono uppercase font-bold"
          >
            <option value="Yoga">Yoga</option>
            <option value="Weights">Weights</option>
            <option value="Cardio">Cardio</option>
            <option value="Crossfit">Crossfit</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Difficulty Level
          </label>
          <select
            name="difficultyLevel"
            value={formData.difficultyLevel}
            onChange={handleInputChange}
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white font-mono uppercase font-bold"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Duration (Mins)
          </label>
          <input
            type="number"
            name="duration"
            min="15"
            max="180"
            required
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            required
            value={formData.price}
            onChange={handleInputChange}
            placeholder="29.99"
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Execution Time
          </label>
          <input
            type="text"
            name="time"
            required
            value={formData.time}
            onChange={handleInputChange}
            placeholder="08:00 AM"
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white font-mono"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono block">
          Weekly Schedule Days
        </label>
        <div className="flex flex-wrap gap-2">
          {availableDays.map((day) => {
            const isChecked = selectedDays.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayCheckbox(day)}
                className={`px-4 py-2 text-[10px] font-mono font-black rounded-lg border uppercase transition-all cursor-pointer ${isChecked ? "bg-brand-secondary/10 border-brand-secondary text-brand-secondary" : "border-gray-800 text-gray-500 hover:text-white"}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          required
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe targets, metrics, configurations..."
          className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl p-4 text-xs text-white placeholder-gray-600 resize-none outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-secondary hover:bg-[#639396] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
      >
        <HiOutlineCheckCircle className="text-sm" />
        {isSubmitting
          ? "Compiling Matrix Document..."
          : "Publish Routine Module Template"}
      </button>
    </form>
  );
}
