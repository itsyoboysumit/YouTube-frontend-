import React, { useState } from "react";
import { updatePlaylist } from "../../services/playlist";

const UpdatePlaylistModal = ({ playlist, onClose, onUpdated }) => {
  const [name, setName] = useState(playlist.name || "");
  const [description, setDescription] = useState(playlist.description || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updatePlaylist(playlist._id, { name, description });
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-zinc-900 p-6 rounded-lg w-[90vw] sm:w-[400px]">
        <h2 className="text-white text-lg font-semibold mb-4">Update Playlist</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist Name"
          className="w-full mb-3 px-3 py-2 rounded bg-zinc-800 text-white placeholder-gray-400"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full mb-4 px-3 py-2 rounded bg-zinc-800 text-white placeholder-gray-400"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlaylistModal;
