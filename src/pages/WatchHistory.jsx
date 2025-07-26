// src/pages/WatchHistory.jsx
import { useAuth } from "../hooks/useAuth";
import WatchHistoryContent from "../components/WatchHistory/WatchHistoryContent";
import GuestMessage from "../components/Common/GuestMessage";

export default function WatchHistory() {
  const { user } = useAuth();

  return user ? <WatchHistoryContent /> : <GuestMessage
    title="Watch History"
    subtitle="Sign in to view your watch history."
  />;
}
