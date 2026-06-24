import Link from "next/link";

export default function FavoriteClassCard({ cls }) {
  return (
    <div className="bg-brand-dark border border-gray-700/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-700/50 transition-all shadow-md group">
      <div className="space-y-1">
        <div className="inline-block text-[9px] font-black uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/20 px-2 py-0.5 rounded text-brand-primary font-mono">
          {cls.difficultyLevel} Tier
        </div>
        <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-brand-primary transition-colors">
          {cls.className}
        </h3>
        <p className="text-xs text-gray-400 font-mono">
          Discipline Allocation:{" "}
          <span className="text-white font-bold">{cls.category}</span> (
          {cls.duration} mins module)
        </p>
      </div>
      <Link
        href={`/classes/${cls._id}`}
        className="bg-brand-primary hover:bg-[#e04e1d] text-white text-[10px] font-black uppercase tracking-widest px-4 py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        Book Class ModulePass &rarr;
      </Link>
    </div>
  );
}
