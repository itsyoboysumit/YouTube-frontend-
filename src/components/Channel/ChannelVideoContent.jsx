import { Fade } from "react-awesome-reveal";
import { useAuth } from "../../hooks/useAuth";
import useVideos from "../../hooks/useVideo";
import Loader from "../Loader";
import ChannelVideoGrid from "./ChannelVideoGrid";

export default function MyVideosContent() {
  const { user } = useAuth();
  const { videos, loading, deleteVideo, updateThumbnail } = useVideos(
    user?._id
  ); 

  if (loading) return <Loader />;

  if (!videos || videos.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Your Uploaded Videos
        </h2>
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
      <div className="p-0 sm:p-4">
        <ChannelVideoGrid
          videos={videos}
          onDelete={deleteVideo}
          onUpdateThumbnail={updateThumbnail}
        />
      </div>
    </Fade>
  );
}
