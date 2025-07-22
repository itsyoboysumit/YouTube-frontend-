// src/pages/MyVideos.jsx
import { useEffect, useState } from "react";
import { getChannelVideos } from "../services/dashboard.js";
import VideoGrid from "../components/VideoGrid/VideoGrid.jsx";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth.js";
import { Fade } from "react-awesome-reveal";

const MyVideos = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMyVideos = async () => {
      try {
        const res = await getChannelVideos();
        setVideos(res);
      } catch (error) {
        toast.error("Failed to load your videos",error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, [user]);

  if (!user) {
    return (
      <Fade duration={500} triggerOnce>
        <div className="flex flex-col items-center justify-center text-white h-[80vh] px-4 text-center">
          <div className="text-6xl mb-6">📹</div>
          <h2 className="text-2xl font-semibold mb-2">See your uploaded content</h2>
          <p className="text-gray-400 mb-6">Sign in to access your uploaded videos.</p>
        </div>
      </Fade>
    );
  }

  if (loading) return <Loader />;

  return (
    <Fade duration={1000} triggerOnce>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Your Uploaded Videos</h2>
        <VideoGrid videos={videos} />
      </div>
    </Fade>
  );
};

export default MyVideos;
