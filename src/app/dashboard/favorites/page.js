"use client";

import { useState } from "react";
import Link from "next/link";
import { FaTrashAlt, FaChevronRight, FaClock } from "react-icons/fa";

export default function FavoritesPage() {
  // Initial reactive track array state
  const [favorites, setFavorites] = useState([
    {
      _id: "66790c1a0412a7bc8100ef25",
      className: "Elite Oxygen Conditioning",
      category: "Cardio",
      duration: 45,
    },
    {
      _id: "66790c1a0412a7bc8100ef29",
      className: "Barbell Snatch Mastery",
      category: "Weights",
      duration: 75,
    },
  ]);

  const handleDestructFavorite = (id) => {
    setFavorites(favorites.filter((item) => item._id !== id));
    // Future validation pass hook setup: axios.delete(`/api/v1/favorites/${id}`)
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Page Title Header Block */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest font-mono block">
          Monitored Indexes
        </span>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-heading">
          Tracked Favorites List
        </h1>
      </div>

      {/* 2. Dribbble-Style Compact List Matrix */}
      <div className="space-y-4">
        {favorites.length === 0 ? (
          <div className="bg-[#303841] border border-gray-700/30 rounded-3xl p-12 text-center text-xs text-gray-500 font-mono">
            Your tracked bookmark matrix is empty.
          </div>
        ) : (
          favorites.map((cls) => (
            <div
              key={cls._id}
              className="bg-[#303841] border border-gray-700/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-700/50 transition-all shadow-md group relative overflow-hidden"
            >
              <div className="space-y-1.5">
                <div className="inline-block text-[9px] font-black uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 rounded text-brand-primary font-mono">
                  {cls.category} Discipline
                </div>
                <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-brand-primary transition-colors">
                  {cls.className}
                </h3>
                <p className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
                  <FaClock className="text-[10px] text-gray-600" />
                  Module Core Allocation:{" "}
                  <span className="text-white font-bold">
                    {cls.duration} Mins
                  </span>
                </p>
              </div>

              {/* Action Buttons Hub Layout */}
              <div className="flex items-center gap-3 justify-end relative z-10">
                {/* Destructive Drop Action Link Button */}
                <button
                  onClick={() => handleDestructFavorite(cls._id)}
                  className="bg-[#242b33] hover:bg-brand-primary/10 text-gray-400 hover:text-brand-primary border border-gray-700/40 hover:border-brand-primary/20 p-3.5 rounded-xl text-xs transition-all cursor-pointer"
                  title="Remove from bookmarks"
                >
                  <FaTrashAlt />
                </button>

                {/* Direct Purchase Checkout Route Access Anchor */}
                <Link
                  href={`/classes/${cls._id}`}
                  className="bg-brand-primary hover:bg-[#e04e1d] text-white text-[10px] font-black uppercase tracking-widest px-4 py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md transform hover:-translate-y-0.5"
                >
                  Book Slot <FaChevronRight className="text-[7px]" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
