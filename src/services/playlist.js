import {api} from "./api"; 

export const createPlaylist = async ({ name, description = "" }) => {
  const payload = {
    name,
    description, // always include both fields
  };

  const response = await api.post("/v1/playlist/", payload);
  return response.data.data;
};


export const getPlaylistById = async (playlistId) => {
  const response = await api.get(`/v1/playlist/${playlistId}`);
  return response.data.data;
};

export const updatePlaylist = async (playlistId, playlistData) => {
  const response = await api.patch(`/v1/playlist/${playlistId}`, playlistData);
  return response.data.data;
};

export const deletePlaylist = async (playlistId) => {
  const response = await api.delete(`/v1/playlist/${playlistId}`);
  return response.data.data;
};

export const addVideoToPlaylist = async (videoId, playlistId) => {
  const response = await api.patch(`/v1/playlist/add/${videoId}/${playlistId}`);
  return response.data.data;
};

export const removeVideoFromPlaylist = async (videoId, playlistId) => {
  const response = await api.patch(`/v1/playlist/remove/${videoId}/${playlistId}`);
  return response.data.data;
};

export const getUserPlaylists = async (userId) => {
  const response = await api.get(`/v1/playlist/user/${userId}`);
  return response.data.data;
};
