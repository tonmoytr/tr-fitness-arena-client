import BookedModulesTableClient from "@/components/dashboard/user/BookedModulesTableClient";
import { Suspense } from "react";

export const metadata = {
  title: "Booked Modules | TR Fitness Arena",
  description:
    "Track your upcoming paid training passes and course clearances.",
};

export default async function BookedClassesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-secondary uppercase tracking-widest block">
          Active Clearances
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Booked <span className="text-brand-secondary">Modules</span>
        </h1>
      </div>

      {/* Clean downstream injection of client table renderer with Suspense boundary */}
      <Suspense
        fallback={
          <div className="text-center font-mono text-xs text-gray-500 animate-pulse py-12">
            Loading active registration ledgers...
          </div>
        }
      >
        <BookedModulesTableClient />
      </Suspense>
    </div>
  );
}
