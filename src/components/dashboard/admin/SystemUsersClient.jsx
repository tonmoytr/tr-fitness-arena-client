"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function SystemUsersClient({ initialUsers, currentAdminId }) {
  const [users, setUsers] = useState(initialUsers);
  const [updatingId, setUpdatingId] = useState(null);

  const handleRoleChange = async (userId, targetRole) => {
    if (userId === currentAdminId) {
      toast.error("Self-demotion is restricted via root system policies.");
      return;
    }

    setUpdatingId(userId);
    const loadingToast = toast.loading(
      "Updating network account authority assignment...",
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${userId}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: targetRole }),
        },
      );

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success(
          `Account authority updated to ${targetRole} successfully.`,
        );

        // Optimistic State Update
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: targetRole } : user,
          ),
        );
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed executing role adjustment.");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Network interface connection exception.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-brand-dark border border-gray-800/60 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#242b33]/40 text-[10px] font-mono font-black uppercase tracking-widest text-gray-400">
              <th className="p-5">User Profile Info</th>
              <th className="p-5">System Role Assignment</th>
              <th className="p-5 text-right">Access Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 text-xs text-gray-300">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-[#242b33]/10 transition-colors"
              >
                {/* 1. Account Profile Details */}
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-white uppercase text-xs shrink-0 overflow-hidden">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.name?.charAt(0) || "U"
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-white uppercase tracking-wide font-heading">
                        {user.name}
                      </h4>
                      <span className="text-[10px] font-mono text-gray-500 block">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* 2. Current Custom Badge Status */}
                <td className="p-5">
                  <span
                    className={`inline-flex items-center font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                      user.role === "admin"
                        ? "bg-red-500/5 border-red-500/20 text-red-400"
                        : user.role === "trainer"
                          ? "bg-brand-primary/5 border-brand-primary/20 text-brand-primary"
                          : "bg-amber-500/5 border-amber-500/20 text-amber-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* 3. Action Role Modification Dropdown */}
                <td className="p-5 text-right">
                  <select
                    disabled={
                      updatingId === user._id || user._id === currentAdminId
                    }
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="bg-[#1b2026] border border-gray-700/60 text-gray-300 focus:border-brand-primary rounded-xl px-3 py-2 text-[10px] font-mono font-black uppercase tracking-wider outline-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <option value="user">Standard User</option>
                    <option value="trainer">Certified Coach</option>
                    <option value="admin">System Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
