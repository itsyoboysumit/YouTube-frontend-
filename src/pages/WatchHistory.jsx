// src/pages/WatchHistory.jsx
import { useEffect, useState } from "react";
import { getWatchHistory } from "../services/auth"; 
import VideoGrid from "../components/VideoGrid/VideoGrid";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { Fade } from "react-awesome-reveal";

const WatchHistory = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchWatchHistory = async () => {
      try {
        const res = await getWatchHistory(); 
        setVideos(res.data); 
      } catch (error) {
        toast.error("Failed to load watch history",error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchHistory();
  }, [user]);

  if (!user) {
    return (
      <Fade duration={500} triggerOnce>
        <div className="flex flex-col items-center justify-center text-white h-[80vh] px-4 text-center">
          <div className="text-6xl mb-6">📼</div>
          <h2 className="text-2xl font-semibold mb-2">Your Watch History</h2>
          <p className="text-gray-400 mb-6">Sign in to see your watch history.</p>
        </div>
      </Fade>
    );
  }

  if (loading) return <Loader />;

  return (
    <Fade duration={1000} triggerOnce>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Your Watch History</h2>
        <VideoGrid videos={videos} />
      </div>
    </Fade>
  );
};

export default WatchHistory;
