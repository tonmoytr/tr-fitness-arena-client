import TrainerForumsClient from "@/components/dashboard/trainer/TrainerForumsClient";

export const metadata = {
  title: "My Forum Posts | TR Fitness Arena",
  description:
    "Manage, review, and delete your published community forum articles.",
};

export default async function MyForumsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-secondary uppercase tracking-widest block">
          Author Analytics Hub
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          My <span className="text-brand-secondary">Forum Posts</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal">
          Review your contributed platform literature or delete older articles
          from the system directory safely.
        </p>
      </div>

      {/* Main interactive data container */}
      <TrainerForumsClient />
    </div>
  );
}
