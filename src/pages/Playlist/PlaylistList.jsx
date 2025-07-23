import React, { useEffect, useState } from "react";
import { usePlaylist } from "../../hooks/usePlaylist";
import { useAuth } from "../../hooks/useAuth";

import Loader from "../../components/Loader";
import PlaylistCard from "../../components/Playlist/PlaylistCard";
import PlaylistGrid from "../../components/Playlist/PlaylistGrid"; // ✅ updated import
import UpdatePlaylistModal from "../../components/Playlist/UpdatePlaylistModal";
import ConfirmDeleteModal from "../../components/Playlist/ConfirmDeleteModal";

const PlaylistList = () => {
  const { user } = useAuth();
  const { playlists, loading, fetchUserPlaylists } = usePlaylist(user?._id);
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

  const renderedPlaylistCards = playlists.map((playlist) => (
    <PlaylistCard
      key={playlist._id}
      playlist={playlist}
      onUpdate={() => handleUpdate(playlist)}
      onDelete={() => handleDelete(playlist)}
    />
  ));

  return (
    <div className="p-4">
      <h1 className="text-white text-2xl font-semibold mb-6">Your Playlists</h1>

      {loading ? (
        <Loader />
      ) : playlists.length === 0 ? (
        <p className="text-gray-400">No playlists found.</p>
      ) : (
        <PlaylistGrid>{renderedPlaylistCards}</PlaylistGrid> // ✅ updated to use PlaylistGrid
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

export default PlaylistList;
