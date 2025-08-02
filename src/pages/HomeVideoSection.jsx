import { useEffect } from "react";
import useVideos from "../hooks/useVideo.js";
import VideoGrid from "../components/VideoGrid/VideoGrid.jsx";

export default function HomeVideoSection() {
  const { videos, loadMore, hasMore, loading } = useVideos();

  useEffect(() => {
    const onScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottomReached && hasMore && !loading) {
        loadMore();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loading, loadMore]);

  return (
    <>
      <VideoGrid videos={videos} />
      
      {/* No more videos message */}
      {!hasMore && videos.length > 0 && (
        <div className="text-center text-sm text-gray-500 mt-10">
          <p>No more videos available.</p>
          <p className="text-xs mt-1 italic">Be a creator — contribute your own videos!</p>
        </div>
      )}
    </>
  );
}
