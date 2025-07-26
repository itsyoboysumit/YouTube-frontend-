import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCurrentUser } from "../../services/auth";

import Loader from "../../components/Loader";
import PlaylistContent from "../../components/Playlist/PlaylistContent";
import GuestMessage from "../../components/Common/GuestMessage";
const PlaylistList = () => {
  const { user: contextUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!authLoading && contextUser) {
        try {
          setLocalLoading(true);
          const res = await getCurrentUser();
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch current user:", err);
          setUser(null);
        } finally {
          setLocalLoading(false);
        }
      } else if (!authLoading && !contextUser) {
        setUser(null);
      }
    };

    fetchUser();
  }, [contextUser, authLoading]);

  if (authLoading || localLoading) return <Loader />;
  if (!user) return <GuestMessage
    title="Explore Playlists"
    subtitle="Sign in to view and manage your playlists."
  />;
  return <PlaylistContent userId={user._id} />;
};

export default PlaylistList;
