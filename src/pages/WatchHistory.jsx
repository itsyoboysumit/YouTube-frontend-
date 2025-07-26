// src/pages/WatchHistory.jsx
import { useAuth } from "../hooks/useAuth";
import WatchHistoryContent from "../components/WatchHistory/WatchHistoryContent";
import WatchHistoryGuest from "../components/WatchHistory/WatchHistoryGuest";

export default function WatchHistory() {
  const { user } = useAuth();

  return user ? <WatchHistoryContent /> : <WatchHistoryGuest />;
}
