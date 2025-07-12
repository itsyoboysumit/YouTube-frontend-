import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos }) => {
    return (
        console.log(videos),
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
            ))}
        </div>
    );
};

export default VideoGrid;
