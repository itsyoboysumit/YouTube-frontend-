import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { formatViews } from "../../utilis/formatViews.js";
import { timeAgo } from "../../utilis/timeAgo.js";

function ChannelVideoCard({ video, onDelete, onUpdateThumbnail }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => setShowConfirm(true);

  const handleConfirmDelete = async () => {
    await onDelete();
    setShowConfirm(false);
  };

  const handleCancel = () => setShowConfirm(false);

  const handleUpdateThumbnail = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) onUpdateThumbnail(file);
    };
    input.click();
  };

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

  return (
    <>
      <div className="relative w-full">
        <div className="flex flex-col sm:flex-row gap-3 w-full p-2 hover:bg-neutral-800 rounded-lg transition-all duration-300 relative">
          <button
            onClick={handleDeleteClick}
            className="absolute top-2 mt-1 mr-1 sm:mt-0 sm:mr-0 right-2 z-10 opacity-70 hover:text-red-600 bg-zinc-800 hover:bg-zinc-950 text-white p-2 rounded-full shadow-md transition-colors"
            title="Delete Video"
          >
            <Trash2 size={20} />
          </button>

          <button
            onClick={handleUpdateThumbnail}
            className="absolute top-2  mt-1 mr-3 sm:mt-0  right-10 z-10 opacity-70 hover:text-red-600 bg-zinc-800 hover:bg-zinc-950 text-white p-2 rounded-full shadow-md transition-colors"
            title="Update Thumbnail"
          >
            <ImageIcon size={20} />
          </button>

          <Link
            to={`/watch/${video._id}`}
            className="flex flex-col sm:flex-row w-full gap-3"
          >
            <div className="w-full sm:w-60 flex-shrink-0 relative aspect-video rounded-lg overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-start w-full">
              <h3 className="text-white font-semibold line-clamp-2 text-base sm:text-lg">
                {video.title}
              </h3>

              <div className="text-sm text-gray-400 mb-1">
                {formatViews(video.views || 0)} views •{" "}
                {timeAgo(video.createdAt)}
              </div>

              <div className="flex items-center gap-2 mb-1">
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
                <span className="text-sm text-gray-300">{video.owner}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-neutral-900 w-11/12 max-w-sm rounded-lg p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-red-500 mb-4">
              This action cannot be undone!
            </h2>

            <p className="text-gray-300 mb-6">
              Deleting this video will permanently remove it and all related
              data. Are you absolutely sure?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(ChannelVideoCard);
