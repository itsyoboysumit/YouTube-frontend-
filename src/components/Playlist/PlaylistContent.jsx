import React, { useEffect, useState } from "react";
import { usePlaylist } from "../../hooks/usePlaylist";
import PlaylistCard from "./PlaylistCard";
import PlaylistGrid from "./PlaylistGrid";
import UpdatePlaylistModal from "./UpdatePlaylistModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Loader from "../Loader";

const PlaylistContent = ({ userId }) => {
  const { playlists, loading, fetchUserPlaylists } = usePlaylist(userId);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchUserPlaylists();
  }, [fetchUserPlaylists]);

  const handleUpdate = (playlist) => {
    setSelectedPlaylist(playlist);
    setShowUpdateModal(true);
  };

  const handleDelete = (playlist) => {
    setSelectedPlaylist(playlist);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-white text-2xl font-semibold mb-6">Your Playlists</h1>

      {loading ? (
        <Loader />
      ) : playlists.length === 0 ? (
        <p className="text-gray-400">No playlists found.</p>
      ) : (
        <PlaylistGrid>
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
              onUpdate={() => handleUpdate(playlist)}
              onDelete={() => handleDelete(playlist)}
            />
          ))}
        </PlaylistGrid>
      )}

      {showUpdateModal && (
        <UpdatePlaylistModal
          playlist={selectedPlaylist}
          onClose={() => setShowUpdateModal(false)}
          onUpdated={fetchUserPlaylists}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          playlist={selectedPlaylist}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={fetchUserPlaylists}
        />
      )}
    </div>
  );
};

export default PlaylistContent;
