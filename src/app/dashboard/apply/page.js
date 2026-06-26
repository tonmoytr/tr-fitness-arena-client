import TrainerApplicationForm from "@/components/dashboard/user/TrainerApplicationForm";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
export const metadata = {
  title: "Trainer Application | TR Fitness Arena",
  description: "Submit your credentials to join our elite coaching staff.",
};

export default async function ApplyAsTrainerPage() {
  return (
    <main className="max-w-xl mx-auto space-y-6 pt-4 pb-12">
      {/* Structural Header Unit */}
      <div className="space-y-1.5">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black text-brand-primary uppercase tracking-widest hover:underline mb-2"
        >
          <HiArrowLeft /> Back to Workspace Node
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Apply as <span className="text-brand-primary">Trainer</span>
        </h1>
        <p className="text-xs text-gray-400 font-normal leading-relaxed">
          Submit your verified athletic training background credentials to get
          promoted to a platform Coach profile.
        </p>
      </div>

      {/* Injecting the Client-Side Form Wrapper */}
      <TrainerApplicationForm />
    </main>
  );
}
