import AddClassFormClient from "@/components/dashboard/trainer/AddClassFormClient";

export const metadata = {
  title: "Add New Class | TR Fitness Arena",
  description:
    "Deploy a fresh training routine matrix into the approval channel.",
};

export default async function AddClassPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-4 pb-12">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-secondary uppercase tracking-widest block">
          Trainer Workspace Node
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Create <span className="text-brand-secondary">Class Routine</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal">
          Design your technical performance metrics blueprint. Submitted cards
          remain hidden until administrative authorization.
        </p>
      </div>

      <AddClassFormClient />
    </div>
  );
}
