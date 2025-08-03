import { useState } from 'react';
import { searchVideos } from '../services/video';

const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const performSearch = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchVideos(query);
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    performSearch,
  };
};

export default useSearch;
