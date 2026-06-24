import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export default function BookedClassCard({ cls }) {
  return (
    <div className="bg-brand-dark border border-gray-700/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-700/50 transition-all shadow-md group">
      <div className="space-y-1.5">
        <div className="inline-block text-[9px] font-black uppercase tracking-widest bg-brand-secondary/10 border border-brand-secondary/20 px-2 py-0.5 rounded text-brand-secondary font-mono">
          {cls.category}
        </div>
        <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-brand-secondary transition-colors">
          {cls.className}
        </h3>
        <p className="text-xs text-gray-400 font-mono">
          Coach: <span className="text-white font-bold">{cls.trainer}</span> • {cls.duration} mins velocity
        </p>
        <p className="text-xs text-brand-secondary font-medium pt-1 font-mono flex items-center gap-1">
          ⏰ {cls.schedule}
        </p>
      </div>
      <Link 
        href={`/classes/${cls._id}`}
        className="bg-[#242b33] hover:bg-brand-primary border border-gray-700/40 hover:border-transparent text-gray-200 hover:text-white text-[10px] font-black uppercase tracking-widest px-4 py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        Launch Spec <GoArrowRight  />
      </Link>
    </div>
  );
}