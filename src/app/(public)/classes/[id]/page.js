import Link from "next/link";
import {
  HiArrowLeft,
  HiOutlineBookOpen,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineTag,
  HiOutlineAcademicCap,
  HiOutlineCalendar,
} from "react-icons/hi2";
import { getClassById } from "@/lib/actions/classes";
import ClassBookingWidget from "@/components/classes/ClassBookingWidget";

export default async function ClassDetailsPage({ params }) {
  const { id } = await params;
  const { data: fitnessClass, error } = await getClassById(id);

  if (error || !fitnessClass) {
    return (
      <main className="w-full min-h-screen bg-brand-dark text-white flex items-center justify-center p-6">
        <div className="bg-[#242b33] border border-gray-700/30 rounded-3xl p-12 text-center max-w-md space-y-4">
          <p className="text-sm text-brand-primary font-mono font-medium">
            ⚠️ {error || "Module not found"}
          </p>
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-black text-brand-secondary hover:underline"
          >
            <HiArrowLeft /> Return to Catalog Directory
          </Link>
        </div>
      </main>
    );
  }

  const {
    className,
    category,
    difficultyLevel,
    duration,
    price,
    classSchedule,
    description,
    trainer,
    bookingCount,
    image,
  } = fitnessClass;

  return (
    <main className="w-full min-h-screen bg-[#1b2026] text-brand-light pb-24">
      {/* 1. Widescreen Media Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[45vh] bg-brand-dark overflow-hidden border-b border-gray-800">
        <img
          src={image}
          alt={className}
          className="w-full h-full object-cover opacity-30 scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b2026] via-transparent to-black/40" />

        {/* Navigation Layer */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 bg-brand-dark/80 backdrop-blur-md border border-gray-700/50 hover:border-gray-500 text-[11px] font-black uppercase tracking-wider text-gray-200 px-4 py-2.5 rounded-xl transition-all"
          >
            <HiArrowLeft className="text-sm stroke-[2.5]" />
            Back to Directory
          </Link>
        </div>

        {/* Text Details Overlay */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-brand-secondary/10 border border-brand-secondary/20 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-brand-secondary uppercase font-mono">
                  {category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-heading leading-none">
                {className}
              </h1>
            </div>
            <div className="md:text-right border-l-4 border-brand-primary md:border-l-0 md:border-r-4 border-brand-primary pl-4 md:pl-0 md:pr-4 py-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold block">
                Assigned Lead
              </span>
              <span className="text-lg font-black text-white uppercase tracking-wide font-heading">
                {trainer.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Asymmetric Content Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Workspace (Spans 8) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Box A: About This Class Section */}
            <div className="bg-brand-dark border border-gray-700/30 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 text-gray-300 font-bold text-xs uppercase tracking-widest font-mono">
                <HiOutlineBookOpen className="text-base text-brand-secondary" />
                About This Routine Blueprint
              </div>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-normal">
                {description}
              </p>
            </div>

            {/* Box B: Asymmetric Technical Spec-Sheet */}
            <div className="bg-brand-dark border border-gray-700/30 rounded-2xl p-6 md:p-8 space-y-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                <div className="flex items-center gap-2.5 text-white font-bold text-base">
                  <HiOutlineAcademicCap className="text-base text-brand-primary" />
                  <h2 className="uppercase tracking-wide font-heading">
                    Technical Core Matrix
                  </h2>
                </div>
                <span className="text-[10px] text-gray-400 font-mono uppercase font-bold tracking-wider">
                  System Verified
                </span>
              </div>

              {/* Layout Metric Rows */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left Side: Performance Metrics */}
                <div className="md:col-span-5 space-y-4 bg-[#242b33] p-5 rounded-2xl border border-gray-700/20">
                  <div className="border-b border-gray-700/50 pb-3">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-mono block mb-1">
                      Session Duration
                    </span>
                    <p className="text-2xl font-black text-white font-heading">
                      {duration}{" "}
                      <span className="text-xs text-brand-secondary font-normal font-mono">
                        MINUTES
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest font-mono block mb-1">
                      Current Group Density
                    </span>
                    <p className="text-2xl font-black text-white font-heading">
                      {bookingCount}{" "}
                      <span className="text-xs text-brand-secondary font-normal font-mono">
                        STUDENTS
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right Side: Context Vector Tags */}
                <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#242b33] p-4 rounded-xl flex items-center justify-between border border-gray-700/20 group hover:border-brand-primary/40 transition-all">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono block">
                        Discipline
                      </span>
                      <span className="text-sm font-bold text-white uppercase tracking-tight">
                        {category}
                      </span>
                    </div>
                    <HiOutlineTag className="text-lg text-gray-500 group-hover:text-brand-primary transition-colors" />
                  </div>

                  <div className="bg-[#242b33] p-4 rounded-xl flex items-center justify-between border border-gray-700/20 group hover:border-brand-secondary/40 transition-all">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono block">
                        Intensity Tier
                      </span>
                      <span className="text-sm font-bold text-white uppercase tracking-tight">
                        {difficultyLevel}
                      </span>
                    </div>
                    <HiOutlineAcademicCap className="text-lg text-gray-500 group-hover:text-brand-secondary transition-colors" />
                  </div>

                  <div className="bg-[#242b33] p-4 rounded-xl flex items-center justify-between border border-gray-700/20 col-span-1 sm:col-span-2 group hover:border-brand-primary/40 transition-all">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono block">
                        Calendar Allocations
                      </span>
                      <span className="text-sm font-bold text-brand-secondary tracking-wide block truncate">
                        {classSchedule.days.join(", ")} at {classSchedule.time}
                      </span>
                    </div>
                    <HiOutlineCalendar className="text-lg text-gray-500 group-hover:text-brand-primary transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Workspace (Spans 4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <ClassBookingWidget
              classId={id}
              price={price}
              schedule={classSchedule}
              bookingCount={bookingCount}
              duration={duration}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
