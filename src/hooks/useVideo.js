import { useState, useEffect } from "react";
import { getAllVideos } from "../services/video";
import { shuffleArray } from "../utilis/shuffle";

export default function useVideos() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVideos();
  }, [page]);

  const loadVideos = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await getAllVideos({ page, limit: 50 });  
      const shuffled = shuffleArray(res.docs);        

      setVideos(prev => [...prev, ...shuffled]);
      setHasMore(res.hasNextPage);                     
    } catch (error) {
      console.error("Error fetching videos", error);
    } finally {
      setLoading(false);
    }
  };

  return { videos, loadMore: () => setPage(p => p + 1), loading, hasMore };
}
