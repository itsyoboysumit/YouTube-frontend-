import { api } from "./api";

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

// src/services/video.js
export const getAllVideos = async (params = {}) => {
  const response = await api.get('/v1/videos', { params });
  return response.data.data; // return the full pagination object (not just docs)
};



export const getVideoById = async (videoId) => {
  const response = await api.get(`/v1/videos/${videoId}`);
  return response.data.data; // returns the specific video object
};

export const updateVideoThumbnail = async (videoId, thumbnailFile) => {
  const formData = new FormData();
  formData.append("thumbnail", thumbnailFile);

  const response = await api.patch(`/v1/videos/${videoId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // { statusCode, data, message, success }
};

// src/services/video.js

export const deleteVideoById = async (videoId) => {
  const response = await api.delete(`/v1/videos/${videoId}`);
  return response.data;
};


export const updateVideoViewCount = async (videoId) => {
  await api.patch(`/v1/videos/views/${videoId}`);
}
