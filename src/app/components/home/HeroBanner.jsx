import Link from "next/link";
import HeroAnimation from "./HeroAnimation";

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-brand-dark text-brand-light overflow-hidden px-6 md:px-16 py-20">
      {/* 1. Full-Bleed High-Energy Background Image Layer with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop')`,
        }}
      />
      {/* Heavy slate-charcoal overlay matrix to match #303841 color system depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent md:to-brand-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />

      {/* Grid Alignment Layout Core */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        {/* Left Column Content Matrix (8 spans for clean readability) */}
        <div className="lg:col-span-8 space-y-8 text-left">
          <HeroAnimation type="fade-up" delay={0.0}>
            <div className="inline-flex items-center gap-2 bg-black/50 border border-gray-800 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-[10px] font-black tracking-widest text-brand-secondary uppercase font-mono">
                TR FITNESS ARENA PLATFORM
              </span>
            </div>
          </HeroAnimation>

          <div className="space-y-4">
            <HeroAnimation type="fade-up" delay={0.1}>
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] font-heading">
                Forge Your <br />
                <span className="text-brand-primary drop-shadow-md">
                  Physicality
                </span>{" "}
                <br />
                Without Limits.
              </h1>
            </HeroAnimation>

            <HeroAnimation type="fade-up" delay={0.2}>
              <p className="text-gray-300 text-sm md:text-base font-normal max-w-xl leading-relaxed">
                Connect with verified trainers, discover customized training
                sessions, and track your fitness milestones inside a scalable,
                high-performance tracking arena. 
              </p>
            </HeroAnimation>
          </div>

          <HeroAnimation type="fade-up" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                href="/classes"
                className="w-full sm:w-auto text-center bg-brand-primary hover:bg-orange-600 text-brand-light font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded transition-all shadow-lg shadow-brand-primary/20 transform hover:-translate-y-0.5"
              >
                Explore Classes 
              </Link>
              <Link
                href="/signUp"
                className="w-full sm:w-auto text-center bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-brand-secondary text-brand-light font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded transition-colors backdrop-blur-sm"
              >
                Join As Member 
              </Link>
            </div>
          </HeroAnimation>

          {/* Clean Metric Bar */}
          <HeroAnimation type="fade-up" delay={0.4}>
            <div className="pt-8 border-t border-gray-800 grid grid-cols-3 gap-6 max-w-md bg-transparent">
              <div>
                <div className="text-2xl md:text-4xl font-black text-brand-light font-heading tracking-tight">
                  20+
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">
                  Expert Coaches
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-black text-brand-primary font-heading tracking-tight">
                  1.2K+
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">
                  Active Members
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-black text-brand-secondary font-heading tracking-tight">
                  0%
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">
                  Hydration Friction
                </div>
              </div>
            </div>
          </HeroAnimation>
        </div>

        {/* Right Column Content Matrix (4 spans left open for clear visibility background spacing) */}
        <div className="lg:col-span-4 hidden lg:block" />
      </div>
    </section>
  );
}
