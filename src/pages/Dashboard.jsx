import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getCurrentUser } from "../services/auth";
import { getChannelStats } from "../services/dashboard";
import Loader from "../components/Loader";
import DashboardContent from "../components/Dashboard/DashboardContent";
import GuestView from "../components/Dashboard/GuestView";

const DashboardPage = () => {
  const { user: contextUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLocalLoading(true);

      try {
        if (contextUser) {
          const userRes = await getCurrentUser();
          setUser(userRes.data);

          const statsRes = await getChannelStats();
          setStats(statsRes);
        } else {
          setUser(null);
          setStats(null);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setUser(null);
        setStats(null);
      } finally {
        setLocalLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [contextUser, authLoading]);

  if (authLoading || localLoading) return <Loader />;
  if (!user) return <GuestView />;
  if (!stats) return <Loader />;

  return <DashboardContent user={user} stats={stats} />;
};

export default DashboardPage;
