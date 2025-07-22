import { useEffect, useState } from "react";
import { getLikedVideos } from "../services/like.js";
import VideoGrid from "../components/VideoGrid/VideoGrid.jsx";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth.js";
import { Fade } from "react-awesome-reveal";

const LikedVideos = ({ onLoginClick }) => {
  const { user } = useAuth();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchLikedVideos = async () => {
      try {
        const res = await getLikedVideos();
        const vid = res.map(item => item.video);
        setVideos(vid);
      } catch (error) {
        toast.error("Failed to load liked videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, [user]);

  if (!user) {
    return (
      <Fade duration={500} triggerOnce>
        <div className="flex flex-col items-center justify-center text-white h-[80vh] px-4 text-center">
          <div className="text-6xl mb-6">🕘</div>
          <h2 className="text-2xl font-semibold mb-2">Keep track of what you like</h2>
          <p className="text-gray-400 mb-6">Liked videos aren't viewable when signed out.</p>
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition"
          >
            Sign in
          </button>
        </div>
      </Fade>
    );
  }

  if (loading) return <Loader />;

  return (
    <Fade duration={1000} triggerOnce>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Liked Videos</h2>
        <VideoGrid videos={videos} />
      </div>
    </Fade>
  );
};

export default LikedVideos;
