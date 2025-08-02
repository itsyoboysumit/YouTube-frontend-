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
        // Reverse the array here to show most recent first
        setVideos(res.data.reverse());
      } catch {
        toast.error("Failed to load watch history");
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

        {videos.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg mb-2">
              You haven't watched any videos yet.
            </p>
            <p className="text-gray-500">
              Start exploring content you love. The videos you watch will show up here for easy access later!
            </p>
          </div>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </div>
    </Fade>
  );
}
