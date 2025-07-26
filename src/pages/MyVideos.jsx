import { useEffect, useState } from "react";
import { getChannelVideos } from "../services/dashboard";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

import GuestMyVideos from "../components/MyVideos/GuestMyVideos";
import MyVideosContent from "../components/MyVideos/MyVideosContent";

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
        toast.error("Failed to load your videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, [user]);

  if (!user) return <GuestMyVideos />;
  if (loading) return <Loader />;

  return <MyVideosContent videos={videos} />;
};

export default MyVideos;
