import { MOCK_FORUMS_DB } from "@/lib/mock/forumData";

/**
 * Server-Side Data Access Layer (DAL) for querying Community Forum Posts
 * Runs exclusively on the Node server runtime.
 */
export async function getLatestForumPosts() {
  try {
    // -------------------------------------------------------------
    // FUTURE BACKEND SERVER SEPARATION REPLACEMENT:
    // const response = await fetch("http://localhost:5000/api/v1/forums");
    // if (!response.ok) throw new Error("Forum database failed to respond.");
    // const json = await response.json();
    // return { data: json.data, error: null };
    // -------------------------------------------------------------

    const data = MOCK_FORUMS_DB;

    // Strict Domain Policy: Only pass approved posts down to public views
    const approvedPosts = data.filter((post) => post.status === "Approved");

    // Chronological sorting: Newest posts cascade to the top
    const sortedPosts = approvedPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return { data: sortedPosts, error: null };
  } catch (error) {
    console.error("DAL Error [getLatestForumPosts]:", error);
    return { data: [], error: error.message || "Failed to retrieve forum posts." };
  }
}