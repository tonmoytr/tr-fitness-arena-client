"use client";

import { useState } from "react";
import {
  HiOutlineHandThumbUp,
  HiHandThumbUp,
  HiOutlineHandThumbDown,
  HiHandThumbDown,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiOutlineXMark,
} from "react-icons/hi2";

export default function ForumInteractionWidget({ postId, commentsCount }) {
  const [vote, setVote] = useState({ type: null, count: 12 }); // Mock initialization tracking
  const [commentInput, setCommentInput] = useState("");
  const [localComments, setLocalComments] = useState([
    {
      id: "c1",
      user: "Coach Alex Kovacs",
      role: "Trainer",
      text: "This approach completely minimizes central nervous system burnout during high-volume periods.",
      timestamp: "2 hours ago",
    },
  ]);

  const handleVote = (targetType) => {
    if (vote.type === targetType) {
      setVote({
        type: null,
        count: targetType === "up" ? vote.count - 1 : vote.count,
      });
    } else {
      let change = vote.count;
      if (vote.type === "up") change -= 1;
      if (targetType === "up") change += 1;
      setVote({ type: targetType, count: change });
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      user: "Active Member",
      role: "Member",
      text: commentInput,
      timestamp: "Just Now",
    };

    setLocalComments([newComment, ...localComments]);
    setCommentInput("");
  };

  return (
    <div className="space-y-6">
      {/* 1. Professional Voting Matrix Row */}
      <div className="flex items-center gap-3 bg-brand-dark border border-gray-700/20 p-3 rounded-2xl max-w-max shadow-md">
        <button
          onClick={() => handleVote("up")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            vote.type === "up"
              ? "bg-brand-primary text-white"
              : "text-gray-400 hover:text-white hover:bg-[#242b33]"
          }`}
        >
          {vote.type === "up" ? (
            <HiHandThumbUp className="text-sm" />
          ) : (
            <HiOutlineHandThumbUp className="text-sm" />
          )}
          <span>{vote.count}</span>
        </button>

        <div className="w-[1px] h-4 bg-gray-700" />

        <button
          onClick={() => handleVote("down")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            vote.type === "down"
              ? "bg-brand-primary text-white"
              : "text-gray-400 hover:text-white hover:bg-[#242b33]"
          }`}
        >
          {vote.type === "down" ? (
            <HiHandThumbDown className="text-sm" />
          ) : (
            <HiOutlineHandThumbDown className="text-sm" />
          )}
          <span className="sr-only">Dislike</span>
        </button>
      </div>

      {/* 2. Structured Comment Input Panel */}
      <div className="bg-brand-dark border border-gray-700/30 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-300 font-mono">
          <HiOutlineChatBubbleLeftEllipsis className="text-brand-primary text-base" />
          <span>Discussion Insight</span>
        </div>

        <form onSubmit={handlePostComment} className="space-y-3">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Contribute clean empirical observations to this log line..."
            rows={3}
            className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl p-4 text-xs text-white placeholder-gray-600 outline-none transition-all resize-none font-normal"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-brand-primary hover:bg-[#e04e1d] text-white font-black text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer"
            >
              Post Insight Pass
            </button>
          </div>
        </form>
      </div>

      {/* 3. High-Contrast Rendered Feed Logs Area */}
      <div className="space-y-4">
        <span className="text-[10px] font-black tracking-widest uppercase text-gray-500 font-mono block">
          Verified Forum Logs Feed ({localComments.length})
        </span>

        <div className="space-y-4">
          {localComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-brand-dark border border-gray-700/20 rounded-2xl p-5 flex gap-4 items-start shadow-md hover:border-gray-700/50 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#242b33] border border-gray-700/40 text-brand-secondary font-black text-xs font-mono flex items-center justify-center shadow-inner">
                {comment.user.substring(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-white mr-2 uppercase tracking-wide">
                      {comment.user}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1b2026] text-gray-400 border border-gray-800 font-semibold">
                      {comment.role}
                    </span>
                  </div>
                  <span className="text-gray-500 font-mono">
                    {comment.timestamp}
                  </span>
                </div>

                <p className="text-xs text-gray-300 font-normal leading-relaxed">
                  {comment.text}
                </p>

                {/* Conditional CRUD Control handles - shown on card interaction hover */}
                <div className="pt-2 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold text-gray-500">
                  <button className="flex items-center gap-1 hover:text-white cursor-pointer">
                    <HiOutlinePencilSquare /> Edit
                  </button>
                  <button className="flex items-center gap-1 hover:text-brand-primary cursor-pointer">
                    <HiOutlineXMark /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
