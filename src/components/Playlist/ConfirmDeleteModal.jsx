import React, { useState } from "react";
import { deletePlaylist } from "../../services/playlist";
import { Fade } from "react-awesome-reveal";

const ConfirmDeleteModal = ({ playlist, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePlaylist(playlist._id);
      onDeleted();
      onClose();
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <Fade duration={500} triggerOnce>
        <div className="bg-zinc-900 p-6 opacity-90 rounded-lg w-[90vw] sm:w-[400px] shadow-lg">
          <h2 className="text-white text-lg font-semibold mb-4">
            Delete Playlist
          </h2>
          <p className="text-gray-300 mb-4">
            Are you sure you want to delete the playlist "{playlist.name}"?
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-500 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default ConfirmDeleteModal;
