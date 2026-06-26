"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { HiOutlineTrash, HiOutlineEye } from "react-icons/hi2";
import { toast } from "sonner";

export default function FavoritesListClient() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    async function fetchFavorites() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/classes/favorites/user?userId=${currentUser.id}`,
        );
        if (res.ok) {
          const data = await res.json();
          setFavorites(data.favorites);
        }
      } catch (err) {
        console.error("Error retrieving favorites registry:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFavorites();
  }, [currentUser]);

  const handleRemoveFavorite = async (classId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/classes/favorites/${classId}?userId=${currentUser.id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        setFavorites((prev) => prev.filter((item) => item._id !== classId));
        toast.success("Module dropped from your favorites collection.");
      } else {
        toast.error("Could not complete removal transaction.");
      }
    } catch (err) {
      toast.error("Network interface sync timeout.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center font-mono text-xs text-gray-500 animate-pulse py-12">
        Retrieving curated favorites parameters...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-brand-dark border border-gray-700/20 rounded-3xl p-12 text-center text-xs text-gray-400 max-w-md mx-auto space-y-4">
        <p className="font-mono">
          Your favorite classes collection is completely empty.
        </p>
        <Link
          href="/classes"
          className="inline-block bg-brand-primary text-white font-black uppercase tracking-widest px-4 py-2.5 rounded-xl text-[10px]"
        >
          Explore Catalog Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((cls) => (
        <div
          key={cls._id}
          className="bg-brand-dark border border-gray-700/30 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group relative"
        >
          <div className="relative h-40 bg-gray-900 overflow-hidden">
            <img
              src={cls.image}
              alt={cls.className}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-80"
            />
            <div className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-mono font-black uppercase text-brand-secondary tracking-wider border border-gray-700/30">
              {cls.category}
            </div>
          </div>

          <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-black uppercase text-white tracking-wide font-heading truncate">
                {cls.className}
              </h3>
              <p className="text-[10px] text-gray-500 font-mono">
                Trainer: {cls.trainer?.name || "Unassigned Instructor"}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800/80 flex gap-2">
              <Link
                href={`/classes/${cls._id}`}
                className="flex-1 bg-[#242b33] border border-gray-700/50 text-gray-300 text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:text-white transition-colors"
              >
                <HiOutlineEye size={13} /> View Details
              </Link>
              <button
                onClick={() => handleRemoveFavorite(cls._id)}
                className="px-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer"
              >
                <HiOutlineTrash size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
