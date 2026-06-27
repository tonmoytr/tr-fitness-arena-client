"use client";

import { useState, useEffect } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import { toast } from "sonner";
import ReviewApplicationModal from "../modals/ReviewApplications";
import RejectFeedbackModal from "../modals/RejectFeedbackModal";

export default function VerifyTrainersClient() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadApplications = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/applications`,
        );
        if (res.ok && isMounted) setApps(await res.json());
      } catch (err) {
        console.error("Error loading apps:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadApplications();
    return () => {
      isMounted = false;
    };
  }, []);

  // Central Router Dispatcher for Actions
  const handleAuthorizationAction = async (
    appId,
    statusResult,
    targetUserEmail,
    feedbackText = null,
  ) => {
    setIsProcessing(true);
    const loadingToast = toast.loading(
      "Syncing registration payload change...",
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/applications/${appId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: statusResult,
            email: targetUserEmail,
            feedback: feedbackText, // Send custom reason text down to the document
          }),
        },
      );

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success(`Application marked as ${statusResult} successfully.`);
        setApps((prev) => prev.filter((item) => item._id !== appId));
        setIsReviewOpen(false);
        setIsRejectOpen(false);
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed transaction authorization modification.");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Handshake bottleneck failure.");
    } finally {
      setIsProcessing(false);
      setSelectedApp(null);
    }
  };

  if (isLoading)
    return (
      <div className="text-center font-mono text-xs text-gray-500 animate-pulse py-12">
        Querying candidate pipelines...
      </div>
    );

  return (
    <div className="space-y-6">
      {apps.length === 0 ? (
        /* Your gorgeous new Empty State layout component renders perfectly here */
        <div className="bg-brand-dark border border-gray-800/60 rounded-3xl p-12 text-center max-w-md mx-auto relative overflow-hidden shadow-2xl group animate-fadeIn">
          {/* Professional top security accent indicator line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />

          <div className="space-y-5 relative z-10">
            {/* Minimalist Verification Shield Icon */}
            <div className="w-14 h-14 bg-[#242b33]/60 border border-gray-800 rounded-2xl flex items-center justify-center text-gray-500 mx-auto group-hover:border-brand-primary/30 group-hover:text-brand-primary transition-all duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </div>

            {/* Text Layer Layout */}
            <div className="space-y-1.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-white font-heading">
                Verification Registry Clear
              </h3>
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-[290px] mx-auto font-normal">
                The onboarding candidate pipeline is entirely empty. All
                incoming trainer credential requests have been reviewed and
                processed.
              </p>
            </div>

            {/* Subtle status metadata indicator box */}
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full px-3 py-1 font-mono text-[9px] font-black text-emerald-400 uppercase tracking-widest mx-auto">
              <span className="w-1 h-1 rounded-full bg-emerald-400 anarchy-pulse animate-pulse" />
              All Systems Nominal
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-brand-dark border border-gray-700/30 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-[#242b33]/40 text-[10px] font-mono font-black uppercase tracking-widest text-gray-400">
                  <th className="p-5">Applicant Profile</th>
                  <th className="p-5">Experience Metrics</th>
                  <th className="p-5 text-right">Operational Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-xs text-gray-300">
                {apps.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-[#242b33]/20 transition-colors"
                  >
                    <td className="p-5">
                      <div>
                        <h4 className="font-black text-white uppercase font-heading tracking-wide">
                          {app.name}
                        </h4>
                        <span className="text-[10px] font-mono text-gray-500 block">
                          {app.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 font-mono text-gray-400">
                      {app.experience || "0"} Years Track
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setIsReviewOpen(true);
                        }}
                        className="px-4 py-2 bg-[#242b33] border border-gray-700/60 text-gray-400 hover:text-brand-primary rounded-xl text-[10px] font-mono font-black uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <HiOutlineEye size={12} /> Inspect Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Review Modal: Modify the Reject button click callback */}
      <ReviewApplicationModal
        isOpen={isReviewOpen}
        onClose={() => {
          setIsReviewOpen(false);
          setSelectedApp(null);
        }}
        application={selectedApp}
        onAction={(id, status, email) => {
          if (status === "rejected") {
            // Open secondary feedback text modal gate
            setIsRejectOpen(true);
            setIsReviewOpen(false);
          } else {
            handleAuthorizationAction(id, status, email);
          }
        }}
        isProcessing={isProcessing}
      />

      {/* Secondary Feedback Text Box Modal Gate */}
      <RejectFeedbackModal
        isOpen={isRejectOpen}
        onClose={() => {
          setIsRejectOpen(false);
          setSelectedApp(null);
        }}
        applicantName={selectedApp?.name}
        isProcessing={isProcessing}
        onConfirm={(feedbackReason) => {
          handleAuthorizationAction(
            selectedApp._id,
            "rejected",
            selectedApp.email,
            feedbackReason,
          );
        }}
      />
    </div>
  );
}
