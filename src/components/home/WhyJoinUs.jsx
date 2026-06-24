export default function WhyJoin() {
  const leftFeatures = [
    {
      title: "1-On-1 Training",
      description:
        "Fuel your body with meal planning, macros, and healthy habits.",
    },
    {
      title: "Certified Trainer",
      description:
        "Power your performance with smart meal planning, wellness routines.",
    },
  ];

  const rightFeatures = [
    {
      title: "Nutrition & Diet",
      description:
        "Nourish your body meal plans, macros, sustainable healthy habits.",
    },
    {
      title: "Supported",
      description:
        "You're never alone—I'll guide, support, and motivate you always.",
    },
  ];

  return (
    <section className="w-full bg-[#1e242b] py-24 border-t border-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core Header Matching image_88e3df.jpg Layout */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-heading leading-none">
            4 Reasons To Work <br />
            <span className="text-brand-secondary">With US</span>
          </h2>
        </div>

        {/* Dynamic Structural Grid Splitter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column Features Nodes (Spans 4) */}
          <div className="lg:col-span-4 space-y-16 text-center lg:text-right order-2 lg:order-1">
            {leftFeatures.map((item, idx) => (
              <div key={idx} className="relative group space-y-2">
                <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white font-heading">
                  {item.title}
                </h3>
                <p className="text-md text-gray-400 max-w-xs mx-auto lg:mr-0 leading-relaxed font-normal">
                  {item.description}
                </p>
                {/* Decorative Indicator Pointer (Hidden on mobile viewports) */}
                <span className="hidden lg:block absolute top-3 -right-6 w-2 h-2 rounded-full bg-brand-secondary ring-4 ring-brand-secondary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>
            ))}
          </div>

          {/* Center Column: Highlight Frame (Spans 4) */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[3/4] bg-[#171b20] border-4 border-gray-800 rounded-3xl overflow-hidden shadow-2xl group">
              {/* Main Presentation Image Tag - Replace src with your custom variable later */}
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
                alt="Trainer Showcase Focus"
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-102"
              />
              {/* Inner Frame Accent Shading */}
              <div className="absolute inset-0 ring-1 ring-white/10 pointer-events-none rounded-2xl" />
            </div>
          </div>

          {/* Right Column Features Nodes (Spans 4) */}
          <div className="lg:col-span-4 space-y-16 text-center lg:text-left order-3">
            {rightFeatures.map((item, idx) => (
              <div key={idx} className="relative group space-y-2">
                <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white font-heading">
                  {item.title}
                </h3>
                <p className="text-md text-gray-400 max-w-xs mx-auto lg:ml-0 leading-relaxed font-normal">
                  {item.description}
                </p>
                {/* Decorative Indicator Pointer (Hidden on mobile viewports) */}
                <span className="hidden lg:block absolute top-3 -left-6 w-2 h-2 rounded-full bg-brand-secondary ring-4 ring-brand-secondary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
