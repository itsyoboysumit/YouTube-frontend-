import { useState, useEffect } from "react";
import {
  getAllVideos,
  getVideoById,
  deleteVideoById,
  updateVideoThumbnail,
} from "../services/video";
import { getChannelVideos } from "../services/dashboard";
import { shuffleArray } from "../utilis/shuffle";
import { toast } from "react-hot-toast";

export default function useVideos(channelId = null) {
  const [allVideos, setAllVideos] = useState([]);
  const [channelVideos, setChannelVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (channelId) {
      loadChannelVideos();
    } else {
      loadAllVideos();
    }
  }, [channelId, page]);

  const loadAllVideos = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await getAllVideos({ page, limit: 50 });
      const shuffled = shuffleArray(res.docs);
      setAllVideos((prev) => [...prev, ...shuffled]);
      setHasMore(res.hasNextPage);
    } catch (err) {
      console.error("Error loading all videos:", err);
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  const loadChannelVideos = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await getChannelVideos(channelId);
      setChannelVideos(res);
      setHasMore(false);
    } catch (err) {
      console.error("Error loading channel videos:", err);
      toast.error("Failed to load your videos");
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      await deleteVideoById(videoId);
      toast.success("Video deleted successfully");

      if (channelId) {
        setChannelVideos((prev) => prev.filter((video) => video._id !== videoId));
      } else {
        setAllVideos((prev) => prev.filter((video) => video._id !== videoId));
      }
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
      const updatedThumb = `${updatedVideo.thumbnail}?v=${Date.now()}`;

      if (channelId) {
        setChannelVideos((prev) =>
          prev.map((v) => (v._id === videoId ? { ...v, thumbnail: updatedThumb } : v))
        );
      } else {
        setAllVideos((prev) =>
          prev.map((v) => (v._id === videoId ? { ...v, thumbnail: updatedThumb } : v))
        );
      }
    } catch (err) {
      toast.error("Failed to update thumbnail");
      console.error("Thumbnail update error:", err);
    }
  };

  return {
    videos: channelId ? channelVideos : allVideos,
    loading,
    hasMore,
    loadMore: () => setPage((p) => p + 1),
    deleteVideo,
    updateThumbnail,
  };
}
