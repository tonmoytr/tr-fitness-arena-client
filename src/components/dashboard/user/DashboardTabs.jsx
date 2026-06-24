"use client";

import { useState } from "react";

import FavoriteClassCard from "./FavoriteClassCard";
import BookedClassCard from "./BookedClassCard";
import {
  IoCalendarNumberOutline,
  IoCloudUploadOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { LuUserCog } from "react-icons/lu";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function DashboardTabs({ bookedClasses, favoriteClasses }) {
  const [activeTab, setActiveTab] = useState("booked");
  const [profile, setProfile] = useState({
    name: "Tonmoy",
    email: "developer@trfitness.com",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Controls Layout Panel */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-brand-dark border border-gray-700/30 rounded-3xl p-5 space-y-3 shadow-xl">
          <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase font-mono block mb-1 px-2">
            Navigation Matrix
          </span>

          <button
            onClick={() => setActiveTab("booked")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider font-mono transition-all text-left cursor-pointer ${
              activeTab === "booked"
                ? "bg-brand-secondary text-white shadow-md"
                : "text-gray-400 hover:text-white hover:bg-[#242b33]"
            }`}
          >
            <IoCalendarNumberOutline className="text-base" /> Enrolled Modules
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider font-mono transition-all text-left cursor-pointer ${
              activeTab === "favorites"
                ? "bg-brand-secondary text-white shadow-md"
                : "text-gray-400 hover:text-white hover:bg-[#242b33]"
            }`}
          >
            <FaRegHeart lineHeart className="text-base" /> Saved Favorites
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider font-mono transition-all text-left cursor-pointer ${
              activeTab === "settings"
                ? "bg-brand-secondary text-white shadow-md"
                : "text-gray-400 hover:text-white hover:bg-[#242b33]"
            }`}
          >
            <IoSettingsOutline className="text-base" /> Identity Settings
          </button>
        </div>

        {/* Quick Mini Counter Display Cards */}
        <div className="bg-brand-dark border border-gray-700/20 rounded-3xl p-5 grid grid-cols-2 gap-4 text-center">
          <div className="bg-[#1b2026] border border-gray-800 p-4 rounded-2xl">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider font-mono block mb-1">
              Active Passes
            </span>
            <span className="text-2xl font-black text-white font-heading">
              {bookedClasses.length}
            </span>
          </div>
          <div className="bg-[#1b2026] border border-gray-800 p-4 rounded-2xl">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider font-mono block mb-1">
              Tracked Indexes
            </span>
            <span className="text-2xl font-black text-white font-heading">
              {favoriteClasses.length}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Main Feed Segment Layout Workspace Area */}
      <div className="lg:col-span-8">
        {activeTab === "booked" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 font-mono mb-2">
              <IoCalendarNumberOutline className="text-brand-secondary text-base" />{" "}
              Scheduled Bookings
            </div>
            {bookedClasses.map((cls) => (
              <BookedClassCard key={cls._id} cls={cls} />
            ))}
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 font-mono mb-2">
              <FaRegHeart className="text-brand-primary text-base" /> Tracked
              Bookmarks
            </div>
            {favoriteClasses.map((cls) => (
              <FavoriteClassCard key={cls._id} cls={cls} />
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-brand-dark border border-gray-700/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-secondary to-transparent" />
            <div className="space-y-1.5 border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-300 font-mono">
                <IoSettingsOutline className="text-brand-secondary text-base" />{" "}
                Identity Refinement System
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Profile Sync Complete");
              }}
              className="space-y-5"
            >
              <div className="flex items-center gap-4 bg-[#1b2026] p-4 rounded-2xl border border-gray-700/40 max-w-sm">
                <div className="w-11 h-11 rounded-xl bg-brand-dark text-brand-secondary border border-gray-700 font-black text-xs font-mono flex items-center justify-center">
                  {profile.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest font-mono block">
                    Profile Image Node
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[10px] text-brand-secondary font-bold hover:underline cursor-pointer"
                  >
                    <IoCloudUploadOutline /> Upload document
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1">
                    <LuUserCog /> Username
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3 text-xs text-white outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono flex items-center gap-1">
                    <MdOutlineMarkEmailRead /> Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl px-4 py-3 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-gray-800">
                <button
                  type="submit"
                  className="bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all cursor-pointer"
                >
                  Save Parameters
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
