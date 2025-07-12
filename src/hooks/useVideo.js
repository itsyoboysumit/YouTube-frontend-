// src/hooks/useVideos.js
import { useEffect, useState } from 'react';
import { getAllVideos } from '../services/video';

export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      console.log("📡 Starting video fetch..."); // Debug: fetch triggered

      try {
        const data = await getAllVideos();

        console.log("📦 Videos fetched:", data); // Debug: log fetched data
        setVideos(data);
      } catch (error) {
        console.error('❌ Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading };
};
