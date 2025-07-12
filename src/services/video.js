import { api } from "./api";

// Fetch videos from backend
export const getAllVideos = async () => {
  try {
    const response = await api.get(`/v1/videos`);

    // 🐞 Log the full response for debugging
    console.log("✅ Video API response:", response);

    // Extract the docs array
    const videos = response.data?.data?.docs;

    // Confirm the shape is what we expect
    if (!Array.isArray(videos)) {
      console.warn("⚠️ 'docs' is not an array:", videos);
      return [];
    }

    console.log(`✅ Successfully retrieved ${videos.length} videos.`);
    return videos;
  } catch (error) {
    console.error("❌ Error fetching videos:", error);
    return [];
  }
};
