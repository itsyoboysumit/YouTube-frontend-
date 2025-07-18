// src/components/VideoPlayerPage/ChannelInfo.jsx
import React from 'react';

const ChannelInfo = ({ owner }) => {
  return (
    <div className="flex items-center justify-between mt-6 border-b border-gray-700 pb-4">
      <div className="flex items-center gap-4">
        <img
          src={owner?.avatar || 'https://i.pravatar.cc/40'}
          alt="Channel Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-base">{owner?.username || 'Unknown'}</h2>
          <p className="text-sm text-gray-400">Subscribers: 1.2M {/* TODO: Replace if available */}</p>
        </div>
      </div>
      <button className="bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition">
        Subscribe
      </button>
    </div>
  );
};

export default ChannelInfo;
