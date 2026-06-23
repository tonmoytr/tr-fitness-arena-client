"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_CONFIG } from "@/config/branding";

export default function NavbarActions() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Isolated State Simulation for UI Testing / Route Guards Mapping
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentRole, setCurrentRole] = useState(BRAND_CONFIG.roles.USER);

  const getDashboardPath = () => {
    if (currentRole === BRAND_CONFIG.roles.ADMIN) return "/dashboard/admin";
    if (currentRole === BRAND_CONFIG.roles.TRAINER) return "/dashboard/trainer";
    return "/dashboard/user";
  };

  return (
    <>
      {/* Desktop Link Layouts + Role Badge System */}
      <div className="hidden md:flex items-center gap-6">
        {BRAND_CONFIG.routes.public.map((route) => {
          const isActive = pathname === route.path;
          return (
            <Link
              key={route.path}
              href={route.path}
              className={`text-sm font-semibold transition-all hover:text-brand-primary tracking-wide ${
                isActive
                  ? "text-brand-primary font-bold underline underline-offset-4"
                  : "text-gray-300"
              }`}
            >
              {route.label}
            </Link>
          );
        })}

        {isAuthenticated && (
          <Link
            href={getDashboardPath()}
            className={`text-sm font-semibold transition-all hover:text-brand-primary tracking-wide ${
              pathname.startsWith("/dashboard")
                ? "text-brand-primary font-bold"
                : "text-gray-300"
            }`}
          >
            Dashboard
          </Link>
        )}
      </div>

      {/* Action Controller States Dropdown Tier */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated && (
          <div className="flex items-center bg-gray-900 rounded px-2.5 py-1 text-xs text-gray-400 gap-2 border border-gray-800">
            <span className="text-[10px] font-black tracking-widest text-brand-secondary">
              ENV ROLE:
            </span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="bg-transparent font-bold border-none outline-none cursor-pointer text-brand-light capitalize"
            >
              <option value={BRAND_CONFIG.roles.USER} className="bg-brand-dark">
                Member
              </option>
              <option
                value={BRAND_CONFIG.roles.TRAINER}
                className="bg-brand-dark"
              >
                Trainer
              </option>
              <option
                value={BRAND_CONFIG.roles.ADMIN}
                className="bg-brand-dark"
              >
                Admin
              </option>
            </select>
          </div>
        )}

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-dark border-2 border-brand-primary flex items-center justify-center text-xs font-black text-brand-primary tracking-tighter">
              TR
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs font-bold uppercase tracking-widest bg-transparent border border-gray-700 hover:border-brand-primary px-3.5 py-2 rounded text-gray-400 hover:text-brand-light transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/signIn"
              className="text-sm font-semibold text-gray-300 hover:text-brand-light px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/signUp"
              className="bg-brand-primary hover:bg-opacity-95 text-brand-light text-sm font-bold tracking-wide px-5 py-2 rounded shadow transition-all"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Trigger Boundary Box */}
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

      {/* Mobile Navigation Drawer Panels Component */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-brand-dark border-b border-gray-800 px-4 pt-2 pb-6 space-y-1 z-50 shadow-xl md:hidden">
          {BRAND_CONFIG.routes.public.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded text-base font-semibold text-gray-300 hover:bg-gray-900 hover:text-brand-primary"
            >
              {route.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              href={getDashboardPath()}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded text-base font-semibold text-gray-300 hover:bg-gray-900 hover:text-brand-primary"
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </>
  );
}
