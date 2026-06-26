import Link from "next/link";
import { headers } from "next/headers";

import { BRAND_CONFIG } from "@/config/branding";
import NavbarActions from "./NavbarActions";
import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function Navbar() {
  // 1. Fetch user session data directly on the server side using request headers context
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUser = session?.user || null;

  return (
    <header className="w-full bg-brand-dark text-brand-light sticky top-0 z-50 shadow-md border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 1. BRAND TARGET SLOT: Added an inline graphic vector logo structure */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center font-black text-white text-base shadow-lg shadow-brand-primary/10 group-hover:scale-105 transition-transform">
              <Image
                src="/assets/images/logo.png"
                height={36}
                width={36}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-black tracking-widest text-white uppercase font-heading group-hover:text-brand-primary transition-colors">
              {BRAND_CONFIG.logoText}
            </span>
          </Link>
        </div>

        {/* 2. Pass the server-fetched session object down as a clean component property */}
        <NavbarActions user={currentUser} />
      </div>
    </header>
  );
}
