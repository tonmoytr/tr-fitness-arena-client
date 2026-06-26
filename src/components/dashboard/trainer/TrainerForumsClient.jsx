"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { HiOutlineTrash, HiOutlineBookOpen } from "react-icons/hi2";
import { toast } from "sonner";
import DeleteForumModal from "../modals/DeleteForumModal";

export default function TrainerForumsClient() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    let isMounted = true;

    const loadTrainerPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/my-forums?authorId=${currentUser.id}`,
        );
        if (res.ok && isMounted) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Error loading author forums:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTrainerPosts();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/forums/${postToDelete._id}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        setPosts((prev) =>
          prev.filter((item) => item._id !== postToDelete._id),
        );
        toast.success("Forum contribution cleanly dropped.");
        setIsDeleteOpen(false);
      }
    } catch (err) {
      toast.error("Network communication pipeline fault.");
    } finally {
      setIsDeleting(false);
      setPostToDelete(null);
    }
  };

  if (isLoading)
    return (
      <div className="text-center font-mono text-xs text-gray-500 animate-pulse py-12">
        Sifting publication logs...
      </div>
    );

  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <div className="bg-brand-dark border border-gray-800/60 rounded-3xl p-12 text-center max-w-md mx-auto shadow-2xl relative">
          <div className="w-12 h-12 bg-[#242b33] border border-gray-800 rounded-2xl flex items-center justify-center text-gray-500 mx-auto mb-4">
            <HiOutlineBookOpen size={20} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-wider text-white font-heading">
            No Contributed Publications
          </h3>
          <p className="text-[11px] text-gray-500 mt-1 font-mono">
            Your personal publication log is entirely empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-brand-dark border border-gray-800/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl group hover:border-gray-700/60 transition-all"
            >
              <div>
                <div className="h-40 bg-gray-900 border-b border-gray-800 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[9px] font-mono font-black text-brand-secondary bg-brand-secondary/5 border border-brand-secondary/20 uppercase px-2 py-0.5 rounded">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <h3 className="text-base font-black text-white uppercase font-heading tracking-wide line-clamp-1">
                    {post.title}
                  </h3>
                  {/* FIXED: Handles both content schema and legacy test entries gracefully */}
                  <p className="text-xs text-gray-400 font-normal line-clamp-3 leading-relaxed">
                    {post.content || post.description}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-gray-800/40 mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setPostToDelete(post);
                    setIsDeleteOpen(true);
                  }}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl text-[10px] font-mono font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <HiOutlineTrash size={12} /> Wipe Article
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteForumModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        postTitle={postToDelete?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
