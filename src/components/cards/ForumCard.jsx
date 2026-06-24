import Link from "next/link";

export default function ForumCard({ post, className = "" }) {
  const { _id, title, category, content, author, image } = post;

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-end p-6 border border-gray-900 shadow-lg transition-all duration-500 hover:-translate-y-1 ${className}`}
    >
      {/* Background Image Layer with Zoom Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* High-Contrast Dark Gradient Overlay Overlaying the Image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 transition-opacity duration-300 group-hover:opacity-95" />

      {/* Floating Header Tags (Top Left) */}
      <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
        <span className="text-[10px] font-extrabold tracking-wider bg-white text-brand-dark px-3 py-1 rounded-full uppercase shadow-md">
          {category}
        </span>
        <span className="text-[10px] font-extrabold tracking-wider bg-brand-primary text-white px-3 py-1 rounded-full uppercase shadow-md">
          {author.role}
        </span>
      </div>

      {/* Content Content Container (Bottom Aligned) */}
      <div className="relative z-20 space-y-3 transform transition-transform duration-300">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-tight font-heading group-hover:text-brand-secondary transition-colors">
          {title}
        </h3>

        <p className="text-xs text-gray-300 line-clamp-2 font-normal leading-relaxed">
          {content}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px] text-gray-400">
          <span className="font-semibold text-white">By {author.name}</span>
          <span className="font-bold uppercase tracking-widest text-brand-secondary group-hover:text-white transition-colors">
            Read Article &rarr;
          </span>
        </div>
      </div>

      {/* Invisible Click Target Layer */}
      <Link href={`/forum/${_id}`} className="absolute inset-0 z-30" />
    </div>
  );
}
