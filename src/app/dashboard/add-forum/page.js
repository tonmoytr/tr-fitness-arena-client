import AddForumFormClient from "@/components/dashboard/trainer/AddFourmFormClient";

export const metadata = {
  title: "Add Forum Post | TR Fitness Arena",
  description:
    "Contribute educational insights, training tactics, or community updates to the fitness forum.",
};

export default async function AddForumPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-secondary uppercase tracking-widest block">
          Knowledge Base Matrix
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Create <span className="text-brand-secondary">Forum Post</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal">
          Publish premium insights, boxing choreography breakdown, or tactical
          fitness articles straight to the community board.
        </p>
      </div>

      {/* Isolated Client Interactive Form Wrapper */}
      <AddForumFormClient />
    </div>
  );
}
