"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BRAND_CONFIG } from "@/config/branding";
import { authClient } from "@/lib/auth-client"; // Adjust path to your client SDK file instance

import { toast } from "sonner";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineViewColumns } from "react-icons/hi2";

export default function NavbarActions({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // 1. LOGOUT OPERATION CONTROLLER
  const handleLogoutClick = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Session terminated. Exiting arena.");
            setIsOpen(false);
            router.push("/");
            router.refresh(); // Forces Next.js server components to evaluate permissions fresh
          },
        },
      });
    } catch (err) {
      toast.error("Failed to safely terminate auth session.");
    }
  };

  return (
    <>
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {BRAND_CONFIG.routes.public.map((route) => {
          const isActive = pathname === route.path;
          return (
            <Link
              key={route.path}
              href={route.path}
              className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-brand-primary font-mono ${
                isActive ? "text-brand-primary" : "text-gray-400"
              }`}
            >
              {route.label}
            </Link>
          );
        })}

        {/* Conditional Link parameter display */}
        {user && (
          <Link
            href="/dashboard"
            className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-brand-primary font-mono ${
              pathname.startsWith("/dashboard")
                ? "text-brand-primary"
                : "text-gray-400"
            }`}
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* Desktop Authentication State Controllers */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4 border-l border-gray-800 pl-4">
            <div className="flex items-center gap-2.5">
              <img
                src={
                  user.image ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                }
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-700 shadow-inner"
              />
              <div className="flex flex-col">
                <span className="text-xs font-black text-white leading-tight uppercase tracking-wide">
                  {user.name}
                </span>
                <span className="text-[9px] font-mono text-gray-500 uppercase font-bold tracking-wider">
                  {user.role || "member"}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogoutClick}
              className="text-[10px] font-black uppercase tracking-widest bg-[#242b33] border border-gray-800 hover:border-red-500/40 text-gray-400 hover:text-red-400 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <HiOutlineLogout size={13} />
              SignOut
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/signIn"
              className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white px-4 py-2 transition-colors font-mono"
            >
              Sign In
            </Link>
            <Link
              href="/signUp"
              className="bg-brand-primary hover:bg-[#e04e1d] text-white text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl shadow-md shadow-brand-primary/10 transition-all transform hover:-translate-y-0.5"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white focus:outline-none cursor-pointer"
        >
          <svg className="h-6 w-6 fill-none stroke-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Drawer Layer */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-brand-dark border-b border-gray-800/80 px-6 py-5 space-y-4 z-50 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {BRAND_CONFIG.routes.public.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className="block text-xs font-black uppercase tracking-widest text-gray-400 hover:text-brand-primary font-mono"
            >
              {route.label}
            </Link>
          ))}

          {user ? (
            <div className="pt-4 border-t border-gray-800 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.image ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                  }
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-gray-700"
                />
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wide">
                    {user.name}
                  </h4>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                    {user.role}
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#242b33] text-center text-xs font-black uppercase tracking-widest text-white py-3 rounded-xl flex items-center justify-center gap-2 border border-gray-800"
              >
                <HiOutlineViewColumns size={14} /> Dashboard Panel
              </Link>
              <button
                onClick={handleLogoutClick}
                className="w-full bg-red-500/10 border border-red-500/20 text-center text-xs font-black uppercase tracking-widest text-red-400 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <HiOutlineLogout size={14} /> Close Session Token
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-800 flex flex-col gap-2">
              <Link
                href="/signIn"
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-xs font-black uppercase tracking-widest text-gray-400 py-3 font-mono"
              >
                Sign In
              </Link>
              <Link
                href="/signUp"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-brand-primary text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
