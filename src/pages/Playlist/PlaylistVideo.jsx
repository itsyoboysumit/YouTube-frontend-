import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlaylist } from "../../hooks/usePlaylist";
import { useAuth } from "../../hooks/useAuth";

import Loader from "../../components/Loader";
import PlaylistVideoCard from "../../components/Playlist/PlaylistVideoCard";
import PlaylistVideoGrid from "../../components/Playlist/PlaylistVideoGrid";

const PlaylistVideoPage = () => {
  const { user } = useAuth();
  const { playlistId } = useParams();

  const {
    selectedPlaylist,
    fetchPlaylistById,
    removeVideo,
    loading,
  } = usePlaylist(user?._id);

  useEffect(() => {
    if (playlistId) {
      fetchPlaylistById(playlistId);
    }
  }, [playlistId, fetchPlaylistById]);

  if (loading || !selectedPlaylist) return <Loader />;

  const videos = selectedPlaylist.videos || [];

  const renderedVideoCards = videos.map((video) => (
    <div key={video._id}>
      <PlaylistVideoCard
        video={video}
        onRemove={(id) => removeVideo(id, playlistId)}
      />
    </div>
  ));

  return (
    <div className="p-4">
      <h1 className="text-white text-2xl font-semibold mb-4">
        {selectedPlaylist.name}
      </h1>
      <p className="text-gray-400 mb-6">{selectedPlaylist.description}</p>

      {videos.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg mb-2">
            This playlist is currently empty.
          </p>
          <p className="text-gray-500">
            Add some videos to bring it to life! Curate your favorite content and
            make this playlist truly yours.
          </p>
        </div>
      ) : (
        <PlaylistVideoGrid>{renderedVideoCards}</PlaylistVideoGrid>
      )}
    </div>
  );
};

export default PlaylistVideoPage;
