import React, { useEffect, useState } from "react";
import { ThumbsUp, Share, Save, PlusCircle } from "lucide-react";
import { toggleLikeVideo } from "../../services/like";
import { timeAgo } from "../../utilis/timeAgo";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";

const VideoDetails = ({ video }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setLiked(false);
    } else {
      setLiked(video?.isLiked || false);
    }
  }, [user, video?.isLiked]);

  const handleLikeToggle = async () => {
    if (!user) {
      toast("Please login to like the video");
      return;
    }

    try {
      const isLikedNow = await toggleLikeVideo(video._id);
      setLiked(isLikedNow);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleShare = () => {
    const videoUrl = `${window.location.origin}/watch/${video._id}`;

    if (navigator.share) {
      navigator
        .share({
          title: video.title,
          url: videoUrl,
        })
        .then(() => console.log("Video shared successfully"))
        .catch((error) => console.error("Sharing failed:", error));
    } else {
      navigator.clipboard.writeText(videoUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  const handleAddToPlaylist = () => {
    if (!user) {
      toast("Please login to add to playlist");
      return;
    }
    setPlaylistModalOpen(true);
  };

  return (
    <div className="mt-4">
      <h1 className="text-xl font-semibold">{video.title}</h1>
      <div className="flex justify-between items-center mt-2 text-gray-400 text-sm">
        <span>
          {video.views} views • {timeAgo(video.createdAt)}
        </span>
        <div className="flex gap-4">
          {/* Like */}
          <div
            onClick={handleLikeToggle}
            className={`flex items-center gap-1 hover:text-white ${
              liked ? "text-pink-500" : ""
            } ${!user ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <ThumbsUp size={18} />
          </div>

          {/* Add to Playlist */}
          <div
            onClick={handleAddToPlaylist}
            className={`flex items-center gap-1 hover:text-white ${
              !user ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <PlusCircle size={18} />
            <span>Playlist</span>
          </div>

          {/* Share */}
          <div
            onClick={handleShare}
            className="flex items-center gap-1 cursor-pointer hover:text-white"
          >
            <Share size={18} /> <span>Share</span>
          </div>

          {/* Save */}
          <div className="flex items-center gap-1 cursor-pointer hover:text-white">
            <Save size={18} /> <span>Save</span>
          </div>
        </div>
      </div>

      {/* Add to Playlist Modal */}
      <AddToPlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        videoId={video._id}
      />
    </div>
  );
};

export default VideoDetails;
