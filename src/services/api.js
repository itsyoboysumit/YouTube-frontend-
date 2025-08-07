import axios from "axios";
import { startLoader, stopLoader } from "../utilis/loader";

export const api = axios.create({
  baseURL: "https://backend-project-ger2.onrender.com/api",  
  withCredentials: true,                    
});

api.interceptors.request.use((config) => {
  startLoader();
  return config;
}, (error) => {
  stopLoader();
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  stopLoader();
  return response;
}, (error) => {
  stopLoader();
  return Promise.reject(error);
});
