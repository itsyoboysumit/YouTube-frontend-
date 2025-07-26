import { useEffect, useState } from "react";
import { getLikedVideos } from "../../services/like";
import VideoGrid from "../VideoGrid/VideoGrid";
import Loader from "../Loader";
import { toast } from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

const LikedVideosContent = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) return <Loader />;

  return (
    <Fade duration={1000} triggerOnce>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Liked Videos</h2>
        <VideoGrid videos={videos} />
      </div>
    </Fade>
  );
};

export default LikedVideosContent;
