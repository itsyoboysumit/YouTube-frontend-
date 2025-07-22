import { useState } from "react";
import { Link } from "react-router-dom";
import { formatViews } from "../../utilis/formatViews.js";
import { timeAgo } from "../../utilis/timeAgo.js";
import { MoreVertical, PlusCircle, Trash2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

export default function VideoCard({ video }) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const isOwner = user?.username === video.owner;

  return (
    <div className="relative group">
      <Link to={`/watch/${video._id}`} className="block">
        <div className="bg-zinc-900 rounded-xl overflow-hidden shadow hover:scale-105 transition-transform cursor-pointer">
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

              {/* 3-dot menu */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.preventDefault(); // prevent <Link /> navigation
                    setMenuOpen((prev) => !prev);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <MoreVertical size={18} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-6 bg-zinc-800 border border-zinc-700 rounded-md shadow-md text-sm w-48 z-50">
                    <button
                      className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 w-full text-left text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        // TODO: Open playlist modal
                      }}
                    >
                      <PlusCircle size={16} /> Add to Playlist
                    </button>

                    {isOwner && (
                      <button
                        className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 w-full text-left text-red-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(false);
                          // TODO: Call delete video logic
                        }}
                      >
                        <Trash2 size={16} /> Delete Video
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {formatViews(video.views || 0)} views • {timeAgo(video.createdAt)}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
