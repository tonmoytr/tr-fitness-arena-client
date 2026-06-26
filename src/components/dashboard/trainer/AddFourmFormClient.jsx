"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { toast } from "sonner";

export default function AddForumFormClient() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "", // FIXED: Renamed key variable parameter
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/forums`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            authorId: currentUser.id,
            authorName: currentUser.name,
            authorEmail: currentUser.email,
            authorRole: currentUser.role,
          }),
        },
      );

      if (res.ok) {
        toast.success(
          "🚀 Article committed successfully to public community boards!",
        );
        setFormData({ title: "", image: "", content: "" });
      } else {
        toast.error("Failed writing forum metadata entry record.");
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

      {/* Post Title Field */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
          Article / Post Title
        </label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g., Boxing Choreography: Core Balance & Fluid Combinations"
          className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white outline-none"
        />
      </div>

      {/* Image URL Field */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
          Cover Image Resource URL
        </label>
        <input
          type="url"
          name="image"
          required
          value={formData.image}
          onChange={handleInputChange}
          placeholder="e.g., https://images.unsplash.com/photo-example"
          className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3.5 text-xs text-white outline-none"
        />
      </div>

      {/* Content Body Field */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
          Post Body Content
        </label>
        <textarea
          name="content" // FIXED: Targeted content variable name
          rows={6}
          required
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Type deep structural insights, methodology guidelines, or strategic conditioning principles..."
          className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl p-4 text-xs text-white placeholder-gray-600 resize-none outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-secondary hover:bg-[#639396] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
      >
        <HiOutlineDocumentPlus className="text-sm" />
        {isSubmitting
          ? "Syncing Document Matrices..."
          : "Deploy Forum Insight Post"}
      </button>
    </form>
  );
}
