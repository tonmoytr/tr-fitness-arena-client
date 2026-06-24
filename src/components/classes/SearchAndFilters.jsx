"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchAndFilter({ activeFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Unified routing state processor
  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Push the updated URL parameters back up to the server route smoothly
    startTransition(() => {
      router.push(`/classes?${params.toString()}`);
    });
  };

  return (
    <div className="bg-[#171b20] border border-gray-800 p-6 rounded-2xl space-y-6">
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-brand-secondary font-mono mb-4">
          Filter Training Modules
        </h3>
        <div className="w-10 h-[2px] bg-brand-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Interactive Search Input Bar */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Search Module Name
          </label>
          <input
            type="text"
            placeholder="e.g. Boxing, Conditioning..."
            defaultValue={activeFilters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full bg-[#222831] border border-gray-800 focus:border-brand-primary rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 tracking-wide outline-none transition-all"
          />
        </div>

        {/* 2. Category Selection Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Select Discipline
          </label>
          <select
            defaultValue={activeFilters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full bg-[#222831] border border-gray-800 focus:border-brand-primary rounded-xl px-4 py-3 text-xs text-white tracking-wide outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Cardio">Cardio & Boxing</option>
            <option value="Weights">Weights & Strength</option>
            <option value="Yoga">Yoga & Mobility</option>
          </select>
        </div>

        {/* 3. Difficulty Tier Selection Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
            Target Intensity Tier
          </label>
          <select
            defaultValue={activeFilters.level}
            onChange={(e) => handleFilterChange("level", e.target.value)}
            className="w-full bg-[#222831] border border-gray-800 focus:border-brand-primary rounded-xl px-4 py-3 text-xs text-white tracking-wide outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">All Experience Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* System State Micro-Indicator */}
      {isPending && (
        <div className="text-[10px] font-bold text-brand-primary uppercase tracking-widest font-mono animate-pulse">
          ⚡ Syncing server indices...
        </div>
      )}
    </div>
  );
}
