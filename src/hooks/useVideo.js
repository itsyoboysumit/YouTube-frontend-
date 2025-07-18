// src/hooks/useVideos.js
import { useEffect, useState } from 'react';
import { getAllVideos } from '../services/video';

export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {

      try {
        const res = await getAllVideos(); 
        const docs = res || [];

        setVideos(docs);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading };
};
