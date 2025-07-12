import axios from "axios";
console.log("API service initialized");
export const api = axios.create({
  baseURL: "/api",  
  withCredentials: true,                    // for cookies (auth tokens)
});
