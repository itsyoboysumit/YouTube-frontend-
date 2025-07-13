import { ApiError } from '../utils/ApiError.js';

import { api } from './api';

export const createTweet = async (content) => {
  const response = await api.post('/v1/tweets/', { content });
  return response.data; // { statusCode, data, message, success }
};


export const getTweetsByUser = async (userId) => {
  const response = await api.get(`/v1/tweets/user/${userId}`);
  return response.data; 
};

export const deleteTweet = async (tweetId) => {
  const response = await api.delete(`/v1/tweets/${tweetId}`);
  return response.data; 
};

export const updateTweet = async (tweetId, content) => {
  const response = await api.patch(`/v1/tweets/${tweetId}`, { content });
  return response.data; 
};


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

  return response.data; // { statusCode, data, message, success }
};
