import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import LikedVideosContent from "../components/Liked/LikedVideosContent";
import GuestMessage from "../components/Common/GuestMessage";

const LikedVideos = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <GuestMessage
    title="Keep track of what you like"
    subtitle="Sign in to see your liked videos."
  />;

  return <LikedVideosContent />;
};

export default LikedVideos;
