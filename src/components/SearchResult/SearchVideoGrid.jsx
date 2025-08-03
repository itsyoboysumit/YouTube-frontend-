import SearchVideoCard from './SearchVideoCard';

const VideoGrid = ({ videos }) => {
  if (!videos?.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        No videos found for this query.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      {videos.map((video) => (
        <SearchVideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
