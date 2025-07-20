import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Share, Save } from "lucide-react";
import { toggleLikeVideo } from "../../services/like";
import { timeAgo } from "../../utilis/timeAgo"; 
import { useAuth } from "../../hooks/useAuth";  
import {toast} from "react-hot-toast";


const VideoDetails = ({ video }) => {
  const {user} = useAuth();
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = async () => {
    try {
      if (!user){
        toast("Please login to like the video");
        return;
      } 
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

  return (
    <div className="mt-4">
      <h1 className="text-xl font-semibold">{video.title}</h1>
      <div className="flex justify-between items-center mt-2 text-gray-400 text-sm">
        <span>
          {video.views} views • {timeAgo(video.createdAt)} {/* ✅ changed */}
        </span>
        <div className="flex gap-4">
          <div
            onClick={handleLikeToggle}
            className={`flex items-center gap-1 cursor-pointer hover:text-white ${
              liked ? "text-pink-500" : ""
            }`}
          >
            <ThumbsUp size={18} />
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-white">
            <ThumbsDown size={18} />
          </div>

          <div
            onClick={handleShare}
            className="flex items-center gap-1 cursor-pointer hover:text-white"
          >
            <Share size={18} /> <span>Share</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-white">
            <Save size={18} /> <span>Save</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
