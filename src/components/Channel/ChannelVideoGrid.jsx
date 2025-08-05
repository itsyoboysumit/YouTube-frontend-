import ChannelVideoCard from './ChannelVideoCard.jsx';

const ChannelVideoGrid = ({ videos, onDelete, onUpdateThumbnail }) => {
  
  return (
    <div className="flex flex-col gap-6 py-4">
      {videos.map((video) => (
        <ChannelVideoCard
          key={video._id}
          video={video}
          onDelete={() => onDelete(video._id)}
          onUpdateThumbnail={(newFile) =>
          onUpdateThumbnail(video._id, newFile)
          }
        />
      ))}
    </div>
  );
};

export default ChannelVideoGrid;
