import ChannelVideoCard from './ChannelVideoCard.jsx';

const VideoGrid = ({ videos }) => {
  if (!videos?.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        No video found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      {videos.map((video) => (
        <ChannelVideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
