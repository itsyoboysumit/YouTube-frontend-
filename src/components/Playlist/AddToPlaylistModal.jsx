import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { usePlaylist } from "../../hooks/usePlaylist";

const AddToPlaylistModal = ({ videoId, isOpen, onClose }) => {
  const { user } = useAuth();
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);

  const {
    playlists,
    loading,
    createNewPlaylist,
    addVideo,
  } = usePlaylist(user?._id);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 100);
    } else {
      setTimeout(() => setShow(false), 300);
    }
  }, [isOpen]);

  const handleAdd = async (playlistId) => {
    try {
      await addVideo(videoId, playlistId);
      onClose();
    } catch {
      console.error("Failed to add video to playlist");
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim() || !description.trim()) return;

    await createNewPlaylist({ name: newPlaylistName, description });
    setNewPlaylistName("");
    setDescription("");
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        show ? "opacity-100 backdrop-blur-sm" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`
          relative z-10 bg-zinc-900 rounded-xl p-5 w-[90vw]
          sm:w-[80vw] md:w-[350px] max-h-[80vh] overflow-hidden
          transition-all duration-300 transform
          ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        <h2 className="text-white text-lg font-semibold mb-4">Add to Playlist</h2>

        <div className="space-y-2 mb-4">
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="Playlist name"
            className="w-full px-3 py-1 rounded text-sm bg-zinc-800 text-white placeholder-gray-400"
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-3 py-1 rounded text-sm bg-zinc-800 text-white placeholder-gray-400"
          />

          <button
            onClick={handleCreatePlaylist}
            disabled={!newPlaylistName.trim() || !description.trim()}
            className="w-full bg-red-600 text-white text-sm py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-500"
          >
            Create Playlist
          </button>
        </div>

        <div className="space-y-2 overflow-y-auto pr-2 max-h-48 border-t border-zinc-700 pt-3 custom-scrollbar">
          {loading ? (
            <p className="text-gray-400">Loading playlists...</p>
          ) : playlists.length === 0 ? (
            <p className="text-gray-400">No playlists found.</p>
          ) : (
            playlists.map((playlist) => {
              const isAlreadyAdded = playlist.videos?.some(
                (v) => v._id === videoId
              );

              return (
                <div
                  key={playlist._id}
                  className="flex justify-between items-center text-white py-2 border-b border-zinc-700"
                >
                  <span className="text-sm line-clamp-1">{playlist.name}</span>
                  <button
                    onClick={() => handleAdd(playlist._id)}
                    disabled={isAlreadyAdded}
                    className={`text-xs px-3 py-1 rounded ${
                      isAlreadyAdded
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-500"
                    }`}
                  >
                    {isAlreadyAdded ? "Added" : "Add"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
