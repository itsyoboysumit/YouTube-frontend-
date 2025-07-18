// src/components/VideoPlayerPage/VideoPlayer.jsx
import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      <video src={videoUrl} controls className="w-full h-full" />
    </div>
  );
};

export default VideoPlayer;
``