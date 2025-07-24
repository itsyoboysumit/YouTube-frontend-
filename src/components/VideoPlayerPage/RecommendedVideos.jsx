import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatViews } from '../../utilis/formatViews';
import { timeAgo } from '../../utilis/timeAgo';

const RecommendedVideos = ({ videos = [] }) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const sentinelRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024); // lg breakpoint

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + 10);
        }
      },
      { threshold: 1 }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [isLargeScreen]);

  const visibleVideos = isLargeScreen
    ? videos.slice(0, visibleCount)
    : videos.slice(0, 10); // mobile: fixed 10 videos

  return (
    <div className="space-y-5">
      {visibleVideos.map((video) => (
        <Link
          key={video._id}
          to={`/watch/${video._id}`}
          className="flex gap-3 hover:bg-zinc-800 p-2 rounded-lg transition-all"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-40 h-24 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex flex-col justify-between overflow-hidden">
            <h4 className="text-sm font-semibold leading-snug text-white line-clamp-2">
              {video.title}
            </h4>
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
            <div className="text-xs text-gray-500">
              {formatViews(video.views)} views • {timeAgo(video.createdAt)}
            </div>
          </div>
        </Link>
      ))}
      {isLargeScreen && <div ref={sentinelRef}></div>}
    </div>
  );
};

export default RecommendedVideos;
