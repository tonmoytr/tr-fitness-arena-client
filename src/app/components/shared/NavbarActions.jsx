"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_CONFIG } from "@/config/branding";

export default function NavbarActions() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Real layout parameters - Initialized to standard public member flow
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {/* Desktop Layout links */}
      <div className="hidden md:flex items-center gap-8">
        {BRAND_CONFIG.routes.public.map((route) => {
          const isActive = pathname === route.path;
          return (
            <Link
              key={route.path}
              href={route.path}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-brand-primary ${
                isActive ? "text-brand-primary font-bold" : "text-gray-300"
              }`}
            >
              {route.label}
            </Link>
          );
        })}

        {isAuthenticated && (
          <Link
            href="/dashboard"
            className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-brand-primary ${
              pathname.startsWith("/dashboard")
                ? "text-brand-primary font-bold"
                : "text-gray-300"
            }`}
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* Authentication CTA Matrix */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="w-9 h-9 rounded-full bg-brand-dark border-2 border-brand-primary flex items-center justify-center text-xs font-black text-brand-primary"
            >
              ME
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs font-bold uppercase tracking-widest bg-transparent border border-gray-700 hover:border-brand-primary px-4 py-2 rounded text-gray-400 hover:text-brand-light transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/signIn"
              className="text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-brand-light px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/signUp"
              className="bg-brand-primary hover:bg-opacity-95 text-brand-light text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded shadow transition-all"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-brand-light focus:outline-none"
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

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-brand-dark border-b border-gray-800 px-6 py-4 space-y-3 z-50 shadow-xl md:hidden">
          {BRAND_CONFIG.routes.public.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-brand-primary"
            >
              {route.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-brand-primary"
            >
              Dashboard
            </Link>
          ) : (
            <div className="pt-4 border-t border-gray-800 flex flex-col gap-2">
              <Link
                href="/signIn"
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-xs font-bold uppercase tracking-widest text-gray-300 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/signUp"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-brand-primary text-brand-light text-xs font-bold uppercase tracking-widest py-2.5 rounded"
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
