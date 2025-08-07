import { toast } from "react-hot-toast";

export const tryApiCall = async (fn, fallback = null) => {
  try {
    const result = await fn();

    
    if (result === undefined || result === null) {
      toast.error("API returned empty result");
      return fallback;
    }

    return result;
  } catch (error) {
    console.error("API Error:", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
    return fallback;
  }
};
