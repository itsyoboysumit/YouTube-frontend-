// src/components/VideoPlayerPage/RecommendedVideos.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatViews } from '../../utilis/formatViews';
import { timeAgo } from '../../utilis/timeAgo';

const RecommendedVideos = ({ videos = [] }) => {
  return (
    <div className="space-y-5">
      {videos.map((video) => (
        <Link
          key={video._id}
          to={`/watch/${video._id}`}
          className="flex gap-3 hover:bg-zinc-800 p-2 rounded-lg transition-all"
        >
          {/* Thumbnail */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-40 h-24 rounded-lg object-cover flex-shrink-0"
          />

          {/* Video Info */}
          <div className="flex flex-col justify-between overflow-hidden">
            {/* Title */}
            <h4 className="text-sm font-semibold leading-snug text-white line-clamp-2">
              {video.title}
            </h4>

            {/* Owner info */}
            <div className="flex items-center gap-2 mt-1 text-gray-400 text-xs">
              {video.ownerAvatar ? (
                <img
                  src={video.ownerAvatar}
                  alt="Owner Avatar"
                  className="w-5 h-5 rounded-full object-cover border border-gray-500"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-600 text-[10px] flex items-center justify-center">
                  {video.owner?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              <span>{video.owner}</span>
            </div>

            {/* Meta info */}
            <div className="text-xs text-gray-500">
              {formatViews(video.views)} views • {timeAgo(video.createdAt)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedVideos;
