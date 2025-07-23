// src/hooks/usePlaylist.js
import { useState, useEffect, useCallback } from "react";
import {
  getUserPlaylists,
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../services/playlist";
import { toast } from "react-hot-toast";

export function usePlaylist(userId) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserPlaylists = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await getUserPlaylists(userId);
      setPlaylists(res);
    } catch {
      toast.error("Failed to fetch playlists");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchPlaylistById = useCallback(async (playlistId) => {
    if (!playlistId) return;
    setLoading(true);
    try {
      const data = await getPlaylistById(playlistId);
      setSelectedPlaylist(data);
    } catch {
      toast.error("Failed to fetch playlist");
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewPlaylist = useCallback(async ({ name, description = "" }) => {
    if (!name?.trim()) {
      toast.error("Playlist name is required");
      return;
    }

    try {
      const newPL = await createPlaylist({ name, description });
      setPlaylists((prev) => [...prev, newPL]);
      toast.success("Playlist created");
    } catch {
      toast.error("Failed to create playlist");
    }
  }, []);

  const updatePlaylistById = useCallback(
    async (playlistId, updatedData) => {
      try {
        await updatePlaylist(playlistId, updatedData);
        toast.success("Playlist updated");
        await fetchUserPlaylists();
      } catch {
        toast.error("Failed to update playlist");
      }
    },
    [fetchUserPlaylists]
  );

  const deletePlaylistById = useCallback(async (playlistId) => {
    try {
      await deletePlaylist(playlistId);
      setPlaylists((prev) => prev.filter((pl) => pl._id !== playlistId));
      toast.success("Playlist deleted");
    } catch {
      toast.error("Failed to delete playlist");
    }
  }, []);

  const addVideo = useCallback(async (videoId, playlistId) => {
    try {
      await addVideoToPlaylist(videoId, playlistId);
      toast.success("Video added to playlist");
    } catch {
      toast.error("Failed to add video");
    }
  }, []);

  const removeVideo = useCallback(async (videoId, playlistId) => {
    try {
      await removeVideoFromPlaylist(videoId, playlistId);
      setSelectedPlaylist((prev) => ({
        ...prev,
        videos: prev?.videos?.filter((v) => v._id !== videoId) || [],
      }));
      toast.success("Video removed from playlist");
    } catch {
      toast.error("Failed to remove video");
    }
  }, []);

  useEffect(() => {
    fetchUserPlaylists();
  }, [fetchUserPlaylists]);

  return {
    playlists,
    selectedPlaylist,
    setSelectedPlaylist, // ✅ exported now
    loading,
    fetchUserPlaylists,
    fetchPlaylistById,
    createNewPlaylist,
    updatePlaylistById,
    deletePlaylistById,
    addVideo,
    removeVideo,
  };
}
