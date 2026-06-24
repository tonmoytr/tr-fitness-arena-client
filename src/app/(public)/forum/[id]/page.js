import Link from "next/link";
import {
  HiArrowLeft,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { getForumPostById } from "@/lib/actions/forum";
import ForumInteractionWidget from "@/components/forum/ForumInteractionWidget";

export default async function ForumPostDetailsPage({ params }) {
  const { id } = await params;
  const { data: post, error } = await getForumPostById(id);

  if (error || !post) {
    return (
      <main className="w-full min-h-screen bg-brand-dark text-white flex items-center justify-center p-6">
        <div className="bg-[#242b33] border border-gray-700/30 rounded-3xl p-12 text-center max-w-md space-y-4">
          <p className="text-sm text-brand-primary font-mono font-medium">
            ⚠️ {error || "Thread not found"}
          </p>
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-black text-brand-secondary hover:underline"
          >
            <HiArrowLeft /> Return to Forum Directory
          </Link>
        </div>
      </main>
    );
  }

  const { title, category, content, author, commentsCount, image } = post;

  return (
    <main className="w-full min-h-screen bg-[#1b2026] text-brand-light pb-24">
      {/* 1. Full-Bleed High-Contrast Media Banner Header */}
      <div className="relative w-full h-[35vh] md:h-[42vh] bg-brand-dark overflow-hidden border-b border-gray-800">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-25 scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b2026] via-transparent to-black/50" />

        {/* Navigation Floating Layer */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 bg-brand-dark/80 backdrop-blur-md border border-gray-700/50 hover:border-gray-500 text-[11px] font-black uppercase tracking-wider text-gray-200 px-4 py-2.5 rounded-xl transition-all"
          >
            <HiArrowLeft className="text-sm stroke-[2.5]" />
            Back to Discussions
          </Link>
        </div>

        {/* Text Positioning Box Overlay */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-secondary/10 border border-brand-secondary/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
              <span className="text-[10px] font-black tracking-widest text-brand-secondary uppercase font-mono">
                {category}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-heading leading-tight max-w-4xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. Asymmetric Central Layout System */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Context Left Panel Area (Spans 8) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Core Body Card Content container wrapper */}
            <div className="bg-brand-dark border border-gray-700/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-primary via-brand-secondary to-transparent" />

              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-normal first-letter:text-3xl first-letter:font-black first-letter:text-brand-primary first-letter:mr-1">
                {content}
              </p>
            </div>

            {/* Interactive Commits Workspace Leaf Container */}
            <ForumInteractionWidget postId={id} commentsCount={commentsCount} />
          </div>

          {/* Sticky Author Details Metric Sidebar Card (Spans 4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <div className="bg-brand-dark border border-gray-700/30 rounded-3xl p-6 space-y-4 shadow-xl">
              <span className="text-[9px] font-black tracking-widest text-gray-400 uppercase font-mono block border-b border-gray-700/60 pb-2">
                Thread Credentials
              </span>

              <div className="flex items-center gap-3">
                <HiOutlineUserCircle className="text-3xl text-brand-secondary" />
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wide font-heading">
                    {author.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">
                    {author.role} Profile
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-gray-400 bg-[#242b33] p-3 rounded-xl border border-gray-700/20">
                <HiOutlineChatBubbleLeftRight className="text-brand-primary text-sm" />
                <span>Active Track: {commentsCount} Actions indexed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
