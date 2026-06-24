import Link from "next/link";
import ClassCard from "../cards/ClassCard";

export default function FeaturedClasses({ classes, error }) {
  // Production Logic: Sort by highest booking count and slice max 6 records
  const featuredClasses = [...classes]
    .sort((a, b) => b.bookingCount - a.bookingCount)
    .slice(0, 6);

  return (
    <section className="w-full bg-brand-dark text-brand-light py-24 border-y border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              <span className="text-[10px] font-black tracking-widest text-brand-secondary uppercase font-mono">
                Live Enrollment Metrics
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase font-heading">
              Featured{" "}
              <span className="text-brand-primary">Training Modules</span>
            </h2>
          </div>
          <p className="text-xs text-gray-400 max-w-xs md:text-right font-normal leading-relaxed">
            Our highest trending physical conditioning sessions organized
            directly by real-time booking density metrics.
          </p>
        </div>

        {/* Conditional Rendering Grid */}
        {error ? (
          <p className="text-sm text-red-400 font-medium font-mono">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredClasses.map((item) => (
              <ClassCard key={item._id} fitnessClass={item} />
            ))}
          </div>
        )}

        {/* Pro High-End Navigation Button */}
        <div className="flex justify-center pt-4">
          <Link
            href="/classes"
            className="group relative inline-flex items-center justify-center bg-transparent border border-gray-700 hover:border-brand-primary px-10 py-5 overflow-hidden rounded transition-all duration-300"
          >
            {/* Slide-up background accent effect */}
            <span className="absolute inset-0 w-full h-full bg-brand-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

            {/* Interactive button content */}
            <span className="relative text-xs font-black tracking-widest uppercase text-brand-light group-hover:text-brand-light flex items-center gap-3">
              Explore Complete Catalog
              <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-1.5">
                <svg
                  className="w-3.5 h-3.5 stroke-current fill-none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
