import Link from "next/link";

export default function MeetTrainers() {
  const trainers = [
    {
      name: "Alex Kovacs",
      role: "Head Coach",
      image:
        "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Marcus Vance",
      role: "Strength Coach",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-[#1e242b] py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Core Asymmetric Layout Grid Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Typographic Static Anchor Box */}
          <div className="bg-[#171b20] rounded-3xl p-8 flex flex-col justify-center min-h-[400px] border border-gray-800/40 relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/5 blur-3xl rounded-full pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <h2 className="text-4xl font-black uppercase tracking-tight text-white leading-none font-heading">
                Join Our <br /> Team
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[220px]">
                Meet the professionals who guide every step of your fitness
                journey.
              </p>
            </div>
          </div>

          {/* Cards 2 & 3: Trainer Media Profiles */}
          {trainers.map((trainer, idx) => (
            <div
              key={idx}
              className="bg-[#171b20] rounded-3xl overflow-hidden border border-gray-800/40 p-4 flex flex-col justify-between group transition-all duration-300 hover:border-brand-secondary/20 shadow-lg"
            >
              {/* Profile Image Container Frame */}
              <div className="w-full aspect-[4/4] rounded-2xl overflow-hidden bg-gray-900 relative">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Identity Details Block */}
              <div className="text-center pt-6 pb-2 space-y-1">
                <h3 className="text-xl font-black uppercase tracking-tight text-white font-heading transition-colors group-hover:text-brand-secondary">
                  {trainer.name}
                </h3>
                <div className="w-12 h-[1px] bg-gray-800 mx-auto" />
                <p className="text-xs text-gray-400 font-medium pt-1">
                  {trainer.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Interactive Navigation & Action Bar Wrapper */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-800/60">
          {/* Neon Accent Glow Action Button matching image_88f321.jpg */}
          <Link
            href="/beTrainer"
            className="w-full sm:w-auto text-center bg-[#b8e940] hover:bg-[#a6d435] text-black font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(184,233,64,0.3)] hover:shadow-[0_0_30px_rgba(184,233,64,0.5)] transform hover:-translate-y-0.5"
          >
            Join team today
          </Link>

          {/* Carousel Navigation Indicator Handles */}
          <div className="flex items-center gap-3">
            <button className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer">
              <svg
                className="w-4 h-4 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <button className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors cursor-pointer">
              <svg
                className="w-4 h-4 fill-none stroke-current"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
