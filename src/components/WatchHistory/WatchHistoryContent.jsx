// src/components/WatchHistory/WatchHistoryContent.jsx
import { useEffect, useState } from "react";
import { getWatchHistory } from "../../services/auth";
import VideoGrid from "../VideoGrid/VideoGrid";
import Loader from "../Loader";
import { toast } from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

export default function WatchHistoryContent() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const res = await getWatchHistory();
        setVideos(res.data);
      } catch (error) {
        toast.error("Failed to load watch history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchHistory();
  }, []);

  if (loading) return <Loader />;

  return (
    <Fade duration={1000} triggerOnce>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Your Watch History</h2>
        <VideoGrid videos={videos} />
      </div>
    </Fade>
  );
}
