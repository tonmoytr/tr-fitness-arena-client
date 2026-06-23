import Link from "next/link";
import { BRAND_CONFIG } from "@/config/branding";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-dark text-brand-light border-t border-gray-900 py-16 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Core Layout Identity Segment */}
        <div className="space-y-4">
          <h2 className="text-lg font-black tracking-widest text-brand-primary">
            {BRAND_CONFIG.logoText}
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
            An elite management arena coordinating training sessions, open
            discussion frameworks, and physical metric optimizations[cite: 13,
            14].
          </p>
        </div>

        {/* Nav Directory Blocks */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-xs text-gray-400">
            {BRAND_CONFIG.routes.public.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="hover:text-brand-primary transition-colors"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Operational Help Coordinates */}
        <div className="space-y-4 text-xs text-gray-400">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-secondary text-brand-light">
            Contact Channels
          </h3>
          <p className="font-medium">Support: operations@trfitnessarena.com</p>
          <p>Location: Dhaka, Bangladesh</p>
        </div>

        {/* Social Platforms Network Matrices */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
            Social Grid
          </h3>
          <div className="flex items-center gap-4 text-gray-400">
            {/* Standard New X Identity Specifier */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-primary transition-colors"
              aria-label="X Platform"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-900 text-center text-[11px] text-gray-500 tracking-wider">
        &copy; {new Date().getFullYear()} {BRAND_CONFIG.name}. Compiled under
        Production-Grade Architectural Standards[cite: 35].
      </div>
    </footer>
  );
}
