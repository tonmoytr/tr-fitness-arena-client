"use client";

import { useState } from "react";
import { HiOutlineArrowPath, HiOutlineDocumentPlus } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TrainerApplicationForm({
  initialApplicationData,
  currentUser,
}) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    experience: initialApplicationData?.experience || "",
    specialty: initialApplicationData?.specialty || "",
  });

  // PIPELINE RESET: Runs the data deletion request to wipe out historical rejections
  const handleReapplyReset = async () => {
    setIsProcessing(true);
    const loadingToast = toast.loading(
      "Clearing historical rejection records...",
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/applications/reset?userId=${currentUser.id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success("Pipeline unlocked! Resetting application fields.");
        router.refresh(); // Tells Next.js to cleanly re-evaluate the RSC page data mapping
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed executing pipeline normalization.");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Network communication failure.");
    } finally {
      setIsProcessing(false);
    }
  };

  // FRESH SUBMISSION LOGIC
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const loadingToast = toast.loading(
      "Routing credential assets to administration review...",
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            image: currentUser.image,
            experience: Number(formData.experience),
            specialty: formData.specialty,
            status: "pending",
          }),
        },
      );

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success(
          "Credentials successfully registered for administrative review!",
        );
        router.refresh();
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to post onboarding application file.");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Handshake communication breakdown.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (initialApplicationData && initialApplicationData.status === "pending") {
    return (
      <div className="bg-brand-dark border border-gray-800 rounded-3xl p-8 max-w-xl mx-auto text-center space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />

        {/* Animated Pulse System Spinner/Badge */}
        <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary mx-auto animate-pulse">
          ⏳
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-black uppercase tracking-wider text-white font-heading">
            Application Under Review
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
            Your professional coaching credentials have been logged. System
            Administrators are actively checking your credentials dossier.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-brand-primary/5 border border-brand-primary/10 rounded-full px-4 py-1.5 font-mono text-[9px] font-black text-brand-primary uppercase tracking-widest mx-auto">
          <span className="w-1 h-1 rounded-full bg-brand-primary animate-ping" />
          Status: Queue Pending Evaluation
        </div>
      </div>
    );
  }

  // CONDITIONAL CONDENSE STATE 1: If document matches 'rejected', morph view completely
  if (initialApplicationData && initialApplicationData.status === "rejected") {
    return (
      <div className="bg-brand-dark border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden animate-fadeIn">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/40" />

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
            <span className="font-black text-sm">✖</span>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white font-heading">
              Application File Found
            </h3>
            <p className="font-mono text-[10px] text-gray-500 uppercase">
              Current Status:{" "}
              <span className="text-red-400 font-bold">Rejected</span>
            </p>
          </div>
        </div>

        <div className="bg-[#14181c] border border-gray-800/60 rounded-xl p-4 space-y-2 text-xs">
          <p className="text-gray-400">
            💼 Experience Registered: {initialApplicationData.experience} Years
          </p>
          <p className="text-gray-400">
            🎯 Discipline Target: {initialApplicationData.specialty}
          </p>
        </div>

        {/* Dynamic Admin Feedback Box */}
        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 space-y-1">
          <span className="text-[9px] font-mono font-black text-red-400 uppercase tracking-widest block">
            Admin Feedback Message
          </span>
          <p className="text-xs text-gray-300 italic">
            &#34;
            {initialApplicationData.feedback ||
              "No administrative notes provided."}
            &#34;
          </p>
        </div>

        <button
          onClick={handleReapplyReset}
          disabled={isProcessing}
          className="w-full bg-[#242b33] border border-gray-700/60 hover:border-brand-primary text-gray-300 hover:text-white font-mono font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
        >
          <HiOutlineArrowPath className={isProcessing ? "animate-spin" : ""} />
          Re-Submit Corrected Credentials
        </button>
      </div>
    );
  }

  // CONDITIONAL CONDENSE STATE 2: standard application input template view
  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-brand-dark border border-gray-800/60 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-primary via-transparent to-transparent" />

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
          Years of Experience
        </label>
        <input
          type="number"
          required
          min="1"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          placeholder="e.g., 5"
          className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3.5 text-xs text-white outline-none"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
          Discipline Focus Specialty
        </label>
        <input
          type="text"
          required
          value={formData.specialty}
          onChange={(e) =>
            setFormData({ ...formData, specialty: e.target.value })
          }
          placeholder="e.g., Cardio, Boxing, Crossfit"
          className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-primary rounded-xl px-4 py-3.5 text-xs text-white outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-brand-primary hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
      >
        <HiOutlineDocumentPlus className="text-sm" />
        {isProcessing ? "Processing Data..." : "Submit Trainer Onboarding File"}
      </button>
    </form>
  );
}
