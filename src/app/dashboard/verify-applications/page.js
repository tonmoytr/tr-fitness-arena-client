import VerifyTrainersClient from "@/components/dashboard/admin/VerifyTrainersClient";

export const metadata = {
  title: "Verify Trainers | System Control",
  description:
    "Review, audit, and authorize platform application credentials for oncoming fitness coaches.",
};

export default async function VerifyApplicationsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-primary uppercase tracking-widest block">
          Root Security Authorization
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Trainer <span className="text-brand-primary">Applications</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal">
          Inspect credential documentation logs, verify trainer experience
          parameters, and promote or reject applications.
        </p>
      </div>

      {/* Main interactive validation grid panel */}
      <VerifyTrainersClient />
    </div>
  );
}
