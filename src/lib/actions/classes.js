import { MOCK_CLASSES_DB } from "@/lib/mock/classesData";

/**
 * Server-Side Data Access Layer (DAL) for querying System Classes
 * Runs exclusively on the Server.
 */
export async function getApprovedClasses() {
  try {
    // -------------------------------------------------------------
    // FUTURE PRODUCTION LIVE BACKEND SEPARATION:
    // const response = await fetch("http://localhost:5000/api/v1/classes", {
    //   next: { revalidate: 3600 } // Cache data for 1 hour
    // });
    // if (!response.ok) throw new Error("Database failed to respond.");
    // const json = await response.json();
    // return json.data;
    // -------------------------------------------------------------

    // Local Data Simulation Mode (Simulating ultra-fast server-side data extraction)
    const data = MOCK_CLASSES_DB;

    // Strict System Requirement Enforcement: Filter out anything that isn't explicitly approved [cite: 81]
    const approvedClasses = data.filter((item) => item.status === "Approved");

    return { data: approvedClasses, error: null };
  } catch (error) {
    console.error("DAL Error [getApprovedClasses]:", error);
    return { data: [], error: error.message || "Failed to retrieve classes." };
  }
}
