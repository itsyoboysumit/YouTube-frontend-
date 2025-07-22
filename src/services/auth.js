import { api } from './api'; // configured axios instance


export const registerUser = async ({
  username,
  fullName,
  email,
  password,
  avatar,
  coverImage,
}) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('fullName', fullName);
  formData.append('email', email);
  formData.append('password', password);
  if (avatar) formData.append('avatar', avatar);
  if (coverImage) formData.append('coverImage', coverImage);

  const response = await api.post('/v1/users/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // { statusCode, data, message, success }
};




export const loginUser = async (credentials) => {
  const response = await api.post('/v1/users/login', credentials);
  return response.data; 
};



export const logoutUser = async () => {
  return await api.post("/v1/users/logout"); 
};



export const getCurrentUser = async () => {
  const response = await api.get('/v1/users/current-user');
  return response.data;
}



export const refreshToken = async () => {
  const response = await api.post('/v1/users/refresh-token');
  return response.data; 
}



export const changePassword = async ({ oldPassword, newPassword }) => {
  const response = await api.post('/v1/users/change-password', {
    oldPassword,
    newPassword
  });

  return response.data; 
};



export const updateAccount = async ({ fullName, email }) => {
  const response = await api.patch('/v1/users/update-account', {
    fullName,
    email,
  });

  return response.data; // returns updated user 
};


export const updateAvatar = async (avatarFile) => {
  const formData = new FormData();
  formData.append('avatar', avatarFile);

  const response = await api.patch('/v1/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // returns updated user 
};



export const updateCoverImage = async (coverImageFile) => {
  const formData = new FormData();
  formData.append('coverImage', coverImageFile);

  const response = await api.patch('/v1/users/cover-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // returns updated user
};


export const getChannelProfile = async (username) => {
  const response = await api.get(`/v1/users/c/${username}`);
  return response.data;
};   // returns user profile data


export const getWatchHistory = async () => {
  const response = await api.get('/v1/users/history');
  return response.data; 
};

export const addToWatchHistory = async (videoId) => {
  const response = await api.post(`/v1/users/history/${videoId}`);
  return response.data;
}

