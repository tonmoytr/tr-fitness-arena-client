import Link from "next/link";
import { BRAND_CONFIG } from "@/config/branding";
import NavbarActions from "./NavbarActions";

export default function Navbar() {
  return (
    <header className="w-full bg-brand-dark text-brand-light sticky top-0 z-50 shadow-md border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Semantic SEO Clean Brand Target */}
        <div className="flex-shrink-0 flex items-center">
          <Link
            href="/"
            className="text-lg font-black tracking-widest text-brand-primary hover:opacity-90 transition-opacity"
          >
            {BRAND_CONFIG.logoText}
          </Link>
        </div>

        {/* Dynamic Leaf Extraction Layer */}
        <NavbarActions />
      </div>
    </header>
  );
}
