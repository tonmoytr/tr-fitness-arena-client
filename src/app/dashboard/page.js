import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserOverview from "./user/UserOverview";
import TrainerOverview from "./trainer/TrainerOverview";
import AdminDashboardPage from "./admin/AdminPage";

export default async function DashboardOverviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUser = session?.user;

  if (!currentUser) {
    return (
      <div className="p-6 text-xs font-mono text-gray-500 animate-pulse">
        Unauthorized access parameters. Redirecting session...
      </div>
    );
  }

  const userRole = currentUser.role?.toLowerCase() || "user";

  if (userRole === "admin") {
    return <AdminDashboardPage />;
  }

  // TRAINER ROLE ROUTING IMPLEMENTATION
  if (userRole === "trainer") {
    let trainerMetrics = { totalClassesCreated: 0, totalStudentsEnrolled: 0 };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/dashboard/trainer-stats?trainerId=${currentUser.id}`,
        {
          cache: "no-store",
        },
      );
      if (res.ok) {
        trainerMetrics = await res.json();
      }
    } catch (err) {
      console.error("Trainer metrics extraction fault:", err);
    }

    return <TrainerOverview user={currentUser} metrics={trainerMetrics} />;
  }

  // Default Standard Member Route Fallback
  let metrics = {
    totalBooked: 0,
    totalFavorites: 0,
    applicationStatus: "none",
    adminFeedback: null,
  };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/dashboard/member-stats?userId=${currentUser.id}`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      metrics = await res.json();
    }
  } catch (err) {
    console.error("Dashboard metrics server extraction timeout:", err);
  }

  return <UserOverview user={currentUser} metrics={metrics} />;
}
