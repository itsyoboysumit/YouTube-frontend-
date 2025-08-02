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
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-300">
            You haven’t created any playlists yet!
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Playlists help you organize your favorite content. Start building
            your first playlist and make your channel more interactive!
          </p>
        </div>
      ) : (
        <PlaylistGrid>
          {playlists.slice().reverse().map((playlist) => (
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
