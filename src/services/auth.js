// src/services/auth.js
import { api } from './api'; // your configured axios instance


export const registerUser = async (formData) => {
  const response = await api.post('/v1/users/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });

  return response.data;
};


export const loginUser = async (credentials) => {
  const response = await api.post('/v1/users/login', credentials);
  return response.data; // returns { statusCode, data, message, success }
};