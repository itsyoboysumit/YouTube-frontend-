import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-project-ger2.onrender.com/api",  
  withCredentials: true,                    // for cookies (auth tokens)
});
