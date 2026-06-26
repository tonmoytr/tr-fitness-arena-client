import TrainerClassesTableClient from "@/components/dashboard/trainer/TrainerClassesTableClient";

export const metadata = {
  title: "Manage Classes | TR Fitness Arena",
  description:
    "Review, edit, and audit your published fitness routines and attendee logs.",
};

export default async function TrainerClassesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-secondary uppercase tracking-widest block">
          Coach Inventory Registry
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Manage <span className="text-brand-secondary">My Classes</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal">
          Track registration numbers, inspect attendee metrics, modify
          parameters, or drop routine files safely.
        </p>
      </div>

      {/* Downstream isolation of your interactive data table */}
      <TrainerClassesTableClient />
    </div>
  );
}
