import Link from "next/link";
import ForumCard from "../cards/ForumCard";

export default function LatestDiscussions({ posts, error }) {
  return (
    <section className="w-full bg-[#1e242b] py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Headline matching image_88858f.jpg center scheme */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-black tracking-widest text-brand-primary uppercase font-mono bg-brand-primary/10 px-4 py-1.5 rounded-full border border-brand-primary/20">
            Insights & Strategy Logs
          </span>
          <br />
          <br />
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white font-heading leading-none">
            Strength-Building Tips <br />
            <span className="text-brand-secondary">For Daily Life</span>
          </h2>
          <p className="text-xs text-gray-400 font-normal">
            Customized fitness insights and structural training methodologies
            designed to optimize your recovery and output.
          </p>
        </div>

        {/* Bento Grid Assembly Matrix */}
        {error ? (
          <p className="text-sm text-red-400 font-medium text-center font-mono">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
            {/* Post 01: Large Feature Layout Block (Top Left / Spans 7 columns, 2 rows) */}
            {posts[0] && (
              <ForumCard
                post={posts[0]}
                className="md:col-span-7 md:row-span-2"
              />
            )}

            {/* Post 02: Vertical Layout Block (Top Right / Spans 5 columns, 2 rows) */}
            {posts[1] && (
              <ForumCard
                post={posts[1]}
                className="md:col-span-5 md:row-span-2"
              />
            )}

            {/* Post 03: Wide Landscape Layout Block (Bottom / Spans all 12 columns, 1.5 rows) */}
            {posts[2] && (
              <ForumCard
                post={posts[2]}
                className="md:col-span-12 md:row-span-1.5"
              />
            )}
          </div>
        )}

        {/* Pro Action Navigation Element */}
        <div className="flex justify-center pt-20">
          <Link
            href="/forum"
            className="group relative inline-flex items-center justify-center bg-transparent border border-gray-800 hover:border-brand-primary px-10 py-5 overflow-hidden rounded-xl transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-brand-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative text-xs font-black tracking-widest uppercase text-white group-hover:text-white flex items-center gap-3">
              Enter Community Forum
              <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-1.5">
                &rarr;
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
