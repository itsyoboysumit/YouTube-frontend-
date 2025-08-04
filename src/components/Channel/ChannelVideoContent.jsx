import { useEffect, useState } from "react";
import { getChannelVideos } from "../../services/dashboard";
import Loader from "../Loader";
import ChannelVideoGrid from "./ChannelVideoGrid";
import { Fade } from "react-awesome-reveal";
import { toast } from "react-hot-toast";
import {useAuth} from "../../hooks/useAuth"; // ✅ Import Auth

export default function MyVideosContent() {
  const { user } = useAuth(); // ✅ Get logged-in user
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyVideos = async () => {
      if (!user?._id) return;

      try {
        const res = await getChannelVideos(user._id); // ✅ Pass user._id
        setVideos(res); // most recent first
      } catch {
        toast.error("Failed to load your videos");
      } finally {
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, [user?._id]);

  if (loading) return <Loader />;

  if (videos.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Your Uploaded Videos</h2>
        <div className="text-center py-40">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
            You haven’t uploaded any videos yet
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Start sharing your voice with the world. Upload your first video and
            let your creativity shine!
          </p>
        </div>
      </div>
    );
  }

  return (
    <Fade duration={1000} triggerOnce>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Your Uploaded Videos</h2>
        <ChannelVideoGrid videos={videos} />
      </div>
    </Fade>
  );
}
