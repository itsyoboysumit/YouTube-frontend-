// src/components/SearchVideoCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utilis/timeAgo';

const SearchVideoCard = ({ video }) => {
  const {
    _id,
    thumbnail,
    title,
    views,
    createdAt,
    duration,
    owner,
    ownerAvatar,
    description,
  } = video;

  return (
    <Link
      to={`/watch/${_id}`}
      className="flex flex-col sm:flex-row gap-3 w-full p-2 hover:bg-neutral-800 rounded-lg transition-all duration-300"
    >
      
      <div className="w-full sm:w-60 flex-shrink-0 relative aspect-video rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        {duration > 0 && (
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
            {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, '0')}
          </span>
        )}
      </div>

      
      <div className="flex flex-col justify-start w-full">
        
        <h3 className="text-white font-semibold line-clamp-2 text-base sm:text-lg">
          {title}
        </h3>

        <div className="text-sm text-gray-400 mb-1">
          {views.toLocaleString()} views • {timeAgo(createdAt)}
        </div>

        <div className="flex items-center gap-2 mb-1">
          {ownerAvatar && (
            <img
              src={ownerAvatar}
              alt={owner}
              className="w-6 h-6 rounded-full"
            />
          )}
          <span className="text-sm text-gray-300">{owner}</span>
        </div>

        {description && (
          <p className="text-gray-400 text-sm line-clamp-2 hidden sm:block">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default SearchVideoCard;
