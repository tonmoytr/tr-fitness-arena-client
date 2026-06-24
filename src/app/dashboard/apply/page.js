"use client";

import { useState } from "react";
import { FaUserCheck, FaChevronRight, FaGraduationCap } from "react-icons/fa";

export default function ApplyAsTrainerPage() {
  const [formData, setFormData] = useState({
    experience: "",
    specialty: "Yoga",
  });
  const [appStatus, setAppStatus] = useState("Idle"); // Options: "Idle" | "Pending"

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!formData.experience || formData.experience < 0) return;

    setAppStatus("Pending");
    // Future validation integration hook: axios.post('/api/v1/trainers/apply', formData)
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto md:py-20">
      {/* 1. Page Header Block */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest font-mono block">
          Credential Boarding
        </span>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-heading">
          Apply As Lead Trainer
        </h1>
      </div>

      {/* 2. Dribbble-Style Card Layout Frame */}
      <div className="bg-[#303841] border border-gray-700/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-secondary to-transparent" />

        <p className="text-xs text-gray-400 font-normal leading-relaxed flex items-start gap-2.5 bg-[#1b2026] p-4 rounded-xl border border-gray-800/40">
          <FaGraduationCap className="text-lg text-brand-secondary shrink-0 mt-0.5" />
          Submit your professional fitness background and specialization data
          below. Once submitted, your profile index shifts to Pending while
          platform administrators audit your background.
        </p>

        <form onSubmit={handleApplicationSubmit} className="space-y-5">
          {/* Input Component A: Experience Numerical Counter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono block">
              Professional Experience Depth (Years)
            </label>
            <input
              type="number"
              required
              min="0"
              max="40"
              placeholder="e.g. 5"
              disabled={appStatus === "Pending"}
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white placeholder-gray-600 outline-none transition-all font-normal disabled:opacity-40 font-mono"
            />
          </div>

          {/* Input Component B: Specialty Custom Dropdown Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono block">
              Core Technical Specialty Discipline
            </label>
            <div className="relative">
              <select
                disabled={appStatus === "Pending"}
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
                className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white tracking-wide outline-none transition-all appearance-none cursor-pointer disabled:opacity-40 font-medium"
              >
                <option value="Yoga">Yoga & Mobility Systems</option>
                <option value="Weights">Weights & Strength Mastery</option>
                <option value="Cardio">Cardio & Boxing Velocity</option>
                <option value="Crossfit">
                  Crossfit & High Intensity Conditioning
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* Form Action Submit Button */}
          <div className="pt-4 border-t border-gray-800 flex justify-end">
            <button
              type="submit"
              disabled={appStatus === "Pending"}
              className={`font-black text-xs uppercase tracking-widest px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                appStatus === "Pending"
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700/40"
                  : "bg-brand-primary hover:bg-[#e04e1d] text-white shadow-lg shadow-brand-primary/10 transform hover:-translate-y-0.5"
              }`}
            >
              {appStatus === "Pending"
                ? "Application Status: Pending"
                : "Submit Credentials Pass"}
              {appStatus !== "Pending" && (
                <FaChevronRight className="text-[8px]" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
