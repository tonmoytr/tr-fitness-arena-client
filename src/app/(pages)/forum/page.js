import { getLatestForumPosts } from "@/lib/actions/forum";
import Link from "next/link";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserCircle,
  HiArrowRight,
} from "react-icons/hi2";

export default async function CommunityForumPage() {
  // Extract data from our Server action layer
  const { data: posts, error } = await getLatestForumPosts();

  return (
    <main className="w-full min-h-screen bg-[#1b2026] text-brand-light py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header Text Compound */}
        <div className="space-y-3 border-b border-gray-700/50 pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary" />
            <span className="text-[10px] font-black tracking-widest text-brand-primary uppercase font-mono">
              Public Discussion Arena
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Community <span className="text-brand-secondary">Forum Logs</span>
          </h1>
          <p className="text-xs text-gray-400 max-w-xl font-normal leading-relaxed">
            Read verified informational threads, strategy adjustments, and
            performance breakdowns published directly by the lead training team.
          </p>
        </div>

        {/* Dynamic Display Grid Processing */}
        {error ? (
          <p className="text-sm text-brand-primary font-mono font-medium">
            {error}
          </p>
        ) : posts.length === 0 ? (
          <div className="bg-brand-dark border border-gray-700/30 rounded-2xl p-12 text-center">
            <p className="text-sm text-gray-400 font-medium">
              No community forum posts found inside the platform catalog.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-brand-dark border border-gray-700/20 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all duration-300 hover:border-gray-700/60"
              >
                {/* Full Featured Image Display Box */}
                <div className="w-full aspect-[16/10] bg-[#242b33] overflow-hidden relative border-b border-gray-800">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest bg-brand-dark/90 backdrop-blur-md border border-gray-700 text-brand-secondary px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                </div>

                {/* Core Text Info Payload Complex */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white font-heading line-clamp-2 leading-snug group-hover:text-brand-secondary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-400 font-normal leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                  </div>

                  {/* Metadata Row Layer */}
                  <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <HiOutlineUserCircle className="text-base text-gray-500" />
                      <div>
                        <span className="font-bold text-gray-300 block leading-none mb-0.5">
                          {post.author.name}
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 font-bold">
                          {post.author.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-mono font-bold text-gray-500">
                      <HiOutlineChatBubbleLeftRight className="text-xs" />
                      <span>{post.commentsCount}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Anchor Button Row Area */}
                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/forum/${post._id}`}
                    className="w-full bg-[#242b33] hover:bg-brand-primary text-gray-200 hover:text-white font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-700/40 hover:border-transparent cursor-pointer group/btn"
                  >
                    Read More
                    <HiArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
