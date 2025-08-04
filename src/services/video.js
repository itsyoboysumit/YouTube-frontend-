import { api } from "./api";

// Upload a new video
export const uploadVideo = async ({ title, description, videoFile, thumbnail }) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('videoFile', videoFile);
  formData.append('thumbnail', thumbnail);

  const response = await api.post('/v1/videos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data; 
};

// Get all videos with optional filters/pagination
export const getAllVideos = async (params = {}) => {
  const response = await api.get('/v1/videos', { params });
  return response.data.data; // return the full pagination object
};

// Get video by ID
export const getVideoById = async (videoId) => {
  const response = await api.get(`/v1/videos/${videoId}`);
  return response.data.data;
};

// Update video thumbnail
export const updateVideoThumbnail = async (videoId, formData) => {
  const response = await api.patch(`/v1/videos/${videoId}`, formData);
  return response.data.data;
};


// Delete video by ID
export const deleteVideoById = async (videoId) => {
  const response = await api.delete(`/v1/videos/${videoId}`);
  return response.data;
};

// Increment view count for a video
export const updateVideoViewCount = async (videoId) => {
  await api.patch(`/v1/videos/views/${videoId}`);
};

// Search videos by query (title, description, username, fullName)
export const searchVideos = async (query, page = 1, limit = 50) => {
  try {
    const response = await api.get('/v1/videos', {
      params: {
        query,
        page,
        limit,
        sortBy: 'createdAt',
        sortType: 'desc',
      },
    });
    return response.data?.data?.docs || [];
  } catch (error) {
    console.error("Error searching videos:", error);
    return [];
  }
};
