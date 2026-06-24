import Link from "next/link";

export default function ClassCard({ fitnessClass }) {
  const {
    _id,
    className,
    category,
    difficultyLevel,
    duration,
    price,
    trainer,
    bookingCount,
    image,
  } = fitnessClass;

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-primary/20 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* 1. Visual Aspect Cover Layer */}
      <div className="relative w-full aspect-[16/10] bg-brand-dark overflow-hidden">
        {/* Dynamic Zoom Image Background */}
        <img
          src={image}
          alt={className}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-90"
          loading="lazy"
        />
        {/* Shadow Overlay Matrix */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          <span className="text-[10px] font-black tracking-widest text-brand-light bg-brand-primary px-2.5 py-1 rounded uppercase shadow-sm">
            {category}
          </span>
        </div>

        <div className="absolute bottom-3 right-4 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 text-white text-[11px] font-medium flex items-center gap-1">
          🔥{" "}
          <span className="font-bold text-brand-primary">{bookingCount}</span>{" "}
          Active Bookings
        </div>
      </div>

      {/* 2. Text Details Area */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase font-mono">
              {difficultyLevel}
            </span>
            <span className="text-gray-300 text-xs">&bull;</span>
            <span className="text-gray-500 text-xs font-medium">
              {duration} minutes tracking
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-brand-dark group-hover:text-brand-primary transition-colors duration-200 line-clamp-1 uppercase">
            {className}
          </h3>

          <div className="flex items-center gap-2 pt-1">
            <div className="w-5 h-5 rounded-full bg-brand-secondary/20 flex items-center justify-center text-[9px] font-bold text-brand-secondary font-mono">
              TR
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Lead Coach:{" "}
              <span className="font-bold text-gray-700">{trainer.name}</span>
            </p>
          </div>
        </div>

        {/* 3. Action / Financial Breakdown Layer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[9px] text-gray-400 block uppercase font-black tracking-widest font-mono">
              Access Pass
            </span>
            <span className="text-xl font-black text-brand-dark font-heading">
              ${price}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              /session
            </span>
          </div>

          <Link
            href={`/classes/${_id}`}
            className="inline-flex items-center gap-1 bg-brand-dark group-hover:bg-brand-primary text-brand-light text-xs font-black tracking-widest uppercase px-5 py-3 rounded transition-all duration-300 shadow-sm shadow-brand-dark/10 group-hover:shadow-brand-primary/20"
          >
            Details
            <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
