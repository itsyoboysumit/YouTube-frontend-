import { Link } from "react-router-dom";
import { formatViews } from "../../utilis/formatViews.js";
import { timeAgo } from "../../utilis/timeAgo.js";
import { X } from "lucide-react";

export default function PlaylistVideoCard({ video, onRemove }) {
  if (
    !video ||
    typeof video !== "object" ||
    !video.thumbnail ||
    !video.title ||
    !video.createdAt
  ) {
    console.warn("Skipped rendering invalid video:", video);
    return null;
  }

  return (
    <div className="relative">
      <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
        {/* Remove button inside animated container */}
        <button
          onClick={() => onRemove(video._id)}
          className="absolute top-2 right-2 z-10 opacity-70 bg-zinc-800 hover:bg-zinc-700 text-white p-1 rounded-full shadow-md transition-colors"
          title="Remove from playlist"
        >
          <X size={16} />
        </button>

        <Link to={`/watch/${video._id}`} className="block">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-40 object-cover"
          />

          <div className="p-3">
            <h3 className="text-white font-semibold text-md line-clamp-2">
              {video.title}
            </h3>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                {video.ownerAvatar ? (
                  <img
                    src={video.ownerAvatar}
                    alt="Owner Avatar"
                    className="w-6 h-6 rounded-full object-cover border border-gray-500"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs">
                    {video.owner?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                <span>{video.owner}</span>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {formatViews(video.views || 0)} views • {timeAgo(video.createdAt)}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
