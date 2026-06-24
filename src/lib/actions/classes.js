/**
 * Server-Side Data Access Layer (DAL) for querying and filtering System Classes
 * Communicates dynamically with our external Express API.
 */
export async function getFilteredClasses(filters = {}) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const { search = "", category = "", level = "" } = filters;

    // 1. Fetch only Approved classes directly from our Express backend
    const response = await fetch(`${BASE_URL}/classes`, { cache: "no-store" });
    if (!response.ok)
      throw new Error("Could not pull data from the Express gateway.");

    let filteredData = await response.json();

    // 2. Apply Search Filter
    if (search) {
      filteredData = filteredData.filter((item) =>
        item.className.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // 3. Apply Category Filter
    if (category) {
      filteredData = filteredData.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // 4. Apply Difficulty Level Filter
    if (level) {
      filteredData = filteredData.filter(
        (item) => item.difficultyLevel.toLowerCase() === level.toLowerCase(),
      );
    }

    return { data: filteredData, error: null };
  } catch (error) {
    console.error("DAL Error [getFilteredClasses]:", error);
    return {
      data: [],
      error: error.message || "Failed to retrieve filtered classes.",
    };
  }
}

/**
 * Server-Side Data Access Layer (DAL) for querying a single Class Document by ID
 */
export async function getClassById(classId) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    // We will build this backend route next: GET /api/v1/classes/:id
    const response = await fetch(`${BASE_URL}/classes/${classId}`, {
      cache: "no-store",
    });
    if (!response.ok)
      throw new Error("Target training module could not be located.");

    const targetClass = await response.json();

    return { data: targetClass, error: null };
  } catch (error) {
    console.error(`DAL Error [getClassById for ID ${classId}]:`, error);
    return {
      data: null,
      error: error.message || "Failed to retrieve class details.",
    };
  }
}

// import { MOCK_CLASSES_DB } from "../mock/classesData";

// /**
//  * Server-Side Data Access Layer (DAL) for querying and filtering System Classes
//  * Runs exclusively on the Server.
//  */
// export async function getFilteredClasses(filters = {}) {
//   try {
//     const { search = "", category = "", level = "" } = filters;
//     const data = MOCK_CLASSES_DB;

//     // 1. Strict System Rule: Only approved classes can be consumed publicly
//     let filteredData = data.filter((item) => item.status === "Approved");

//     // 2. Apply Search Filter (Case Insensitive match against class name)
//     if (search) {
//       filteredData = filteredData.filter((item) =>
//         item.className.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     // 3. Apply Category Filter
//     if (category) {
//       filteredData = filteredData.filter(
//         (item) => item.category.toLowerCase() === category.toLowerCase(),
//       );
//     }

//     // 4. Apply Difficulty Level Filter
//     if (level) {
//       filteredData = filteredData.filter(
//         (item) => item.difficultyLevel.toLowerCase() === level.toLowerCase(),
//       );
//     }

//     return { data: filteredData, error: null };
//   } catch (error) {
//     console.error("DAL Error [getFilteredClasses]:", error);
//     return {
//       data: [],
//       error: error.message || "Failed to retrieve filtered classes.",
//     };
//   }
// }

// /**
//  * Server-Side Data Access Layer (DAL) for querying a single Class Document by ID
//  * Runs exclusively on the Server.
//  */
// export async function getClassById(classId) {
//   try {
//     const data = MOCK_CLASSES_DB;

//     // Search the collection index for the matching document
//     const targetClass = data.find((item) => item._id === classId);

//     if (!targetClass) {
//       throw new Error("Target training module could not be located.");
//     }

//     return { data: targetClass, error: null };
//   } catch (error) {
//     console.error(`DAL Error [getClassById for ID ${classId}]:`, error);
//     return {
//       data: null,
//       error: error.message || "Failed to retrieve class details.",
//     };
//   }
// }
