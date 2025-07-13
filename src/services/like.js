import { api } from "./api";

export const toggleLikeVideo = async (videoId) => {
  const response = await api.post(`/v1/likes/toggle/v/${videoId}`);
  return response.data.data.liked; // return true/false based on like status
};


export const toggleLikeTweet = async (tweetId) => {
  const response = await api.post(`/v1/likes/toggle/t/${tweetId}`);
  return response.data.data.liked;
};


export const getLikedVideos = async () => {
  const response = await api.get("/v1/likes/videos");
  return response.data.data;
};

export const toggleLikeComment = async (commentId) => {
  const response = await api.post(`/v1/likes/toggle/c/${commentId}`);
  return response.data.data.liked;
};

