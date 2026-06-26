"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";
import {
  HiOutlinePencil,
  HiOutlineThumbDown,
  HiOutlineThumbUp,
  HiOutlineTrash,
  HiThumbDown,
  HiThumbUp,
} from "react-icons/hi";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";

export default function ForumInteractionWidget({ postId }) {
  // 1. BetterAuth Hook setup
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  // 2. Local reactive state matrices
  const [postData, setPostData] = useState({
    upvotes: 0,
    downvotes: 0,
    likedBy: [],
    dislikedBy: [],
    comments: [],
  });
  const [newCommentText, setNewCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initial database details state upon cluster load
  useEffect(() => {
    async function fetchLatestThreadDetails() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/forums/${postId}`,
        );
        if (res.ok) {
          const data = await res.json();
          setPostData({
            upvotes: data.upvotes || 0,
            downvotes: data.downvotes || 0,
            likedBy: data.likedBy || [],
            dislikedBy: data.dislikedBy || [],
            comments: data.comments || [],
          });
        }
      } catch (err) {
        console.error("Failed syncing details context payload:", err);
      }
    }
    fetchLatestThreadDetails();
  }, [postId]);

  // 3. VOTING INTERACTION CONTROLLER (Like / Dislike toggle)
  const handleVote = async (voteType) => {
    if (!currentUser) {
      toast.error("Authentication required to interact with threads.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/forums/${postId}/vote`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser.id, voteType }),
        },
      );

      if (res.ok) {
        const updatedArrays = await res.json();

        // Update local state with the actual data arrays returned from backend
        setPostData((prev) => ({
          ...prev,
          likedBy: updatedArrays.likedBy,
          dislikedBy: updatedArrays.dislikedBy,
        }));

        toast.success("Vote metrics updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to sync vote with server.");
    }
  };

  const hasLiked = postData.likedBy?.includes(currentUser?.id);
  const hasDisliked = postData.dislikedBy?.includes(currentUser?.id);

  // 4. COMMENT ACTION CONTROLLER (CREATE / UPDATE / DELETE)
  const handleCommentCRUD = async (
    action,
    commentId = null,
    textValue = "",
  ) => {
    if (!currentUser) {
      toast.error("Authentication required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/forums/${postId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action,
            commentId,
            userId: currentUser.id,
            userName: currentUser.name,
            userImage: currentUser.image,
            text: textValue,
          }),
        },
      );

      if (res.ok) {
        const data = await res.json();

        // Optimistic UI updates based on action block mutation type
        if (action === "CREATE") {
          setPostData((prev) => ({
            ...prev,
            comments: [...prev.comments, data.comment],
          }));
          setNewCommentText("");
          toast.success("Comment indexed successfully.");
        } else if (action === "UPDATE") {
          setPostData((prev) => ({
            ...prev,
            comments: prev.comments.map((c) =>
              c._id === commentId ? { ...c, text: textValue } : c,
            ),
          }));
          setEditingCommentId(null);
          toast.success("Comment modification complete.");
        } else if (action === "DELETE") {
          setPostData((prev) => ({
            ...prev,
            comments: prev.comments.filter((c) => c._id !== commentId),
          }));
          toast.success("Comment dropped from thread logs.");
        }
      }
    } catch (err) {
      toast.error("Communication with database layer timed out.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* VOTING METRIC CONTROL DOCK */}
      <div className="bg-[#242b33] border border-gray-700/30 rounded-3xl p-4 flex items-center gap-6 shadow-md">
        <button
          onClick={() => handleVote("like")}
          className={`flex items-center gap-2 text-xs uppercase font-black tracking-widest px-4 py-2 rounded-xl transition-all border cursor-pointer ${
            hasLiked
              ? "bg-teal-500/10 border-teal-500 text-teal-400"
              : "border-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          {hasLiked ? (
            <HiThumbUp className="text-sm" />
          ) : (
            <HiOutlineThumbUp className="text-sm" />
          )}
          {/* FIXED: Read length property here to display numerical values */}
          <span>{postData.likedBy?.length || 0} Upvotes</span>
        </button>

        <button
          onClick={() => handleVote("dislike")}
          className={`flex items-center gap-2 text-xs uppercase font-black tracking-widest px-4 py-2 rounded-xl transition-all border cursor-pointer ${
            hasDisliked
              ? "bg-red-500/10 border-red-500 text-red-400"
              : "border-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          {hasDisliked ? (
            <HiThumbDown className="text-sm" />
          ) : (
            <HiOutlineThumbDown className="text-sm" />
          )}
          {/* FIXED: Read length property here to display numerical values */}
          <span>{postData.dislikedBy?.length || 0} Downvotes</span>
        </button>
      </div>

      {/* COMMENTS LOG ACTIONS LOOP */}
      <div className="bg-brand-dark border border-gray-700/30 rounded-3xl p-6 space-y-6 shadow-xl">
        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <HiOutlineChatBubbleLeft className="text-brand-secondary text-base" />
          Discussion Thread ({postData.comments.length} Indexes)
        </h3>

        {/* INPUT: NEW COMMENT FORM */}
        {currentUser ? (
          <div className="space-y-3">
            <textarea
              rows={3}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Add your expert feedback parameters to this thread..."
              className="w-full bg-[#1b2026] border border-gray-700/60 focus:border-brand-secondary rounded-xl p-4 text-xs text-white placeholder-gray-600 outline-none transition-all resize-none"
            />
            <button
              onClick={() => handleCommentCRUD("CREATE", null, newCommentText)}
              disabled={isSubmitting || !newCommentText.trim()}
              className="bg-brand-secondary hover:bg-[#639396] text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all disabled:opacity-40 cursor-pointer"
            >
              {isSubmitting ? "Posting..." : "Commit Comment"}
            </button>
          </div>
        ) : (
          <div className="bg-[#242b33] border border-gray-800 rounded-xl p-4 text-center text-xs text-gray-400">
            Please login to contribute to this forum log thread.
          </div>
        )}

        {/* LISTING VIEW STREAM */}
        <div className="space-y-4 border-t border-gray-800/80 pt-4">
          {postData.comments.length === 0 ? (
            <p className="text-xs font-mono text-gray-600 italic">
              No comment tracks indexed yet.
            </p>
          ) : (
            postData.comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-[#242b33] border border-gray-700/20 rounded-2xl p-4 flex gap-3 relative group"
              >
                <img
                  src={
                    comment.userImage ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                  }
                  alt={comment.userName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-700"
                />
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white uppercase tracking-wide">
                      {comment.userName}
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* EDIT FIELD VS PLAIN TEXT DISPLAY */}
                  {editingCommentId === comment._id ? (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full bg-[#1b2026] border border-brand-primary rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleCommentCRUD(
                              "UPDATE",
                              comment._id,
                              editingText,
                            )
                          }
                          className="text-[9px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-800 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {comment.text}
                    </p>
                  )}

                  {/* USER SPECIFIC ACTIONS PANEL */}
                  {currentUser?.id === comment.userId &&
                    editingCommentId !== comment._id && (
                      <div className="flex items-center gap-3 pt-2 text-gray-500 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingCommentId(comment._id);
                            setEditingText(comment.text);
                          }}
                          className="flex items-center gap-1 hover:text-brand-primary text-[10px] uppercase font-bold font-mono cursor-pointer"
                        >
                          <HiOutlinePencil size={11} /> Edit
                        </button>
                        <button
                          onClick={() =>
                            handleCommentCRUD("DELETE", comment._id)
                          }
                          className="flex items-center gap-1 hover:text-red-400 text-[10px] uppercase font-bold font-mono cursor-pointer"
                        >
                          <HiOutlineTrash size={11} /> Delete
                        </button>
                      </div>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
