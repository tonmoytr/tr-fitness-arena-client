/**
 * Server-Side Data Access Layer (DAL) for querying Community Forum Posts
 * Connects dynamically over our separate Node server runtime environment.
 */
export async function getLatestForumPosts() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    // Tweak: Dynamically target your external Express system pipeline gateway
    const response = await fetch(`${BASE_URL}/forums`, { cache: "no-store" });
    if (!response.ok)
      throw new Error("Forum database pipeline failed to respond.");

    const postsData = await response.json();

    return { data: postsData, error: null };
  } catch (error) {
    console.error("DAL Error [getLatestForumPosts]:", error);
    return {
      data: [],
      error: error.message || "Failed to retrieve forum posts.",
    };
  }
}

/**
 * Server-Side Data Access Layer (DAL) for querying a single Forum Post by ID
 */
export async function getForumPostById(postId) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    // Fetch individual post detail profile node over express router parameter map
    const response = await fetch(`${BASE_URL}/forums/${postId}`, {
      cache: "no-store",
    });
    if (!response.ok)
      throw new Error("Target community discussion could not be located.");

    const targetPost = await response.json();

    return { data: targetPost, error: null };
  } catch (error) {
    console.error(`DAL Error [getForumPostById for ID ${postId}]:`, error);
    return {
      data: null,
      error: error.message || "Failed to retrieve forum post.",
    };
  }
}
