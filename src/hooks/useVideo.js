import { useState, useEffect } from "react";
import {
  getAllVideos,
  deleteVideoById,
  updateVideoThumbnail,
  getVideoById,
} from "../services/video";
import { shuffleArray } from "../utilis/shuffle";
import { toast } from "react-hot-toast";

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

      setVideos((prev) => [...prev, ...shuffled]);
      setHasMore(res.hasNextPage);
    } catch (error) {
      console.error("Error fetching videos", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      await deleteVideoById(videoId);
      toast.success("Video deleted successfully");
      setVideos((prev) => prev.filter((video) => video._id !== videoId));
    } catch (err) {
      toast.error("Failed to delete video");
      console.error("Delete error:", err);
    }
  };

  const updateThumbnail = async (videoId, file) => {
    try {
      const formData = new FormData();
      formData.append("thumbnail", file);

      await updateVideoThumbnail(videoId, formData);
      toast.success("Thumbnail updated successfully");

      const updatedVideo = await getVideoById(videoId); 
      setVideos((prev) =>
        prev.map((v) =>
          v._id === videoId
            ? {
                ...v,
                thumbnail: `${updatedVideo.thumbnail}?v=${Date.now()}`,
              }
            : v
        )
      );
      window.location.reload();
    } catch (err) {
      toast.error("Failed to update thumbnail");
      console.error("Thumbnail update error:", err);
    }
  };

  return {
    videos,
    loadMore: () => setPage((p) => p + 1),
    loading,
    hasMore,
    deleteVideo,
    updateThumbnail,
  };
}
