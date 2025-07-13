import axios from "axios";

export const api = axios.create({
  baseURL: "/api",  
  withCredentials: true,                    // for cookies (auth tokens)
});
