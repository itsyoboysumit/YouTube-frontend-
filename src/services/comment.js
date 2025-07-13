import {api} from './api'; 

export const addComment = async (videoId, content) => {
  const response = await api.post(`/v1/comments/${videoId}`, { content });
  return response.data.data;
};


export const deleteComment = async (commentId) => {
  const response = await api.delete(`/v1/comments/c/${commentId}`);
  return response.data.data;
};

export const updateComment = async (commentId, content) => {
  const response = await api.patch(`/v1/comments/c/${commentId}`, { content });
  return response.data.data;
};


export const getVideoComments = async (videoId) => {
  const response = await api.get(`/v1/comments/${videoId}`);
  return response.data.data;
};
