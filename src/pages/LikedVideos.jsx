import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import LikedVideosContent from "../components/Liked/LikedVideosContent";
import GuestLikedVideos from "../components/Liked/GuestLikedView";

const LikedVideos = ({ onLoginClick }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  if (!user) return <GuestLikedVideos onLoginClick={onLoginClick} />;

  return <LikedVideosContent />;
};

export default LikedVideos;
