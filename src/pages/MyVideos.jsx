import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import GuestMessage from "../components/Common/GuestMessage";
import MyVideosContent from "../components/MyVideos/MyVideosContent";

const MyVideos = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <GuestMessage
        title="Manage Your Videos"
        subtitle="Sign in to view and manage your uploaded videos."
      />
    );
  }

  return <MyVideosContent user={user} />;
};

export default MyVideos;
