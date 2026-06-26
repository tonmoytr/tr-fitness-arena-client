"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";
import {
  HiClock,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiXCircle,
} from "react-icons/hi";

export default function TrainerApplicationForm() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [existingApp, setExistingApp] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [experience, setExperience] = useState("");
  const [specialty, setSpecialty] = useState("Weights");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    async function checkStatus() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/trainers/status?userId=${currentUser.id}`,
        );
        if (res.ok) {
          const data = await res.json();
          setExistingApp(data.application);
        }
      } catch (err) {
        console.error("Failed loading application state parameters:", err);
      } finally {
        setLoadingStatus(false);
      }
    }
    checkStatus();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/trainers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image,
          experience,
          specialty,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Onboarding registry error.");
        return;
      }

      toast.success(
        "🚀 Application submitted! Status set to pending evaluation.",
      );
      setExistingApp({ status: "pending", experience, specialty });
    } catch (err) {
      toast.error("Gateway data validation sync failure.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingStatus) {
    return (
      <div className="text-center font-mono text-xs text-gray-500 animate-pulse py-8">
        Synchronizing credential logs...
      </div>
    );
  }

  if (existingApp) {
    return (
      <div className="bg-brand-dark border border-gray-700/30 rounded-3xl p-6 md:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-secondary" />

        <div className="flex items-center gap-3">
          {existingApp.status === "pending" && (
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
              <HiClock
                className="text-xl animate-spin"
                style={{ animationDuration: "3s" }}
              />
            </div>
          )}
          {existingApp.status === "rejected" && (
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <HiXCircle className="text-xl" />
            </div>
          )}

          <div>
            <h3 className="text-sm font-black uppercase text-white tracking-wide">
              Application File Found
            </h3>
            <p className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
              Current Pipeline Status:{" "}
              <span
                className={`${existingApp.status === "pending" ? "text-yellow-400" : "text-red-400"}`}
              >
                {existingApp.status}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-[#1b2026] rounded-2xl p-4 border border-gray-800 space-y-2 text-xs text-gray-300">
          <p>
            💼 <strong>Experience Registered:</strong> {existingApp.experience}{" "}
            Years
          </p>
          <p>
            🎯 <strong>Discipline Target:</strong> {existingApp.specialty}
          </p>
        </div>

        {existingApp.status === "pending" && (
          <p className="text-[11px] text-gray-400 italic">
            Your credentials are under manual assessment by system
            administration. Double submission profiles are locked.
          </p>
        )}

        {existingApp.status === "rejected" && (
          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 space-y-1">
            <span className="text-[9px] font-mono font-black uppercase tracking-wider text-red-400 block">
              Admin Feedback Message
            </span>
            <p className="text-xs text-gray-400">
              {existingApp.feedback || "No administrative notes provided."}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-brand-dark border border-gray-700/30 rounded-3xl p-6 md:p-8 space-y-5 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-primary via-transparent to-transparent" />

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
          <HiOutlineBriefcase className="text-brand-primary text-sm" /> Years of
          Active Experience
        </label>
        <input
          type="number"
          min="1"
          max="40"
          required
          disabled={isSubmitting}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="e.g., 5"
          className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3.5 text-xs text-white outline-none transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1.5">
          <HiOutlineAcademicCap className="text-brand-primary text-sm" />{" "}
          Athletic Discipline Specialty
        </label>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          disabled={isSubmitting}
          className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3.5 text-xs text-white outline-none transition-all cursor-pointer font-mono font-bold uppercase tracking-wide"
        >
          <option value="Yoga">Yoga</option>
          <option value="Weights">Weights</option>
          <option value="Cardio">Cardio</option>
          <option value="Crossfit">Crossfit</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !experience}
        className="w-full bg-brand-primary hover:bg-[#e04e1d] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-brand-primary/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
      >
        <HiOutlineCheckCircle className="text-sm" />
        {isSubmitting ? "Processing Request..." : "Submit Trainer Application"}
      </button>
    </form>
  );
}
