import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getCurrentUser } from "../services/auth";
import Loader from "../components/Loader";
import { Fade } from "react-awesome-reveal";
import { FiEdit, FiSettings, FiUser } from "react-icons/fi"; // Icons for action buttons

const Profile = () => {
  const { user: contextUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState(contextUser);
  const [localLoading, setLocalLoading] = useState(!contextUser && !authLoading);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setUser(null);
      } finally {
        setLocalLoading(false);
      }
    };

    if (!contextUser && !authLoading) {
      fetchUser();
    }
  }, [contextUser, authLoading]);

  if (authLoading || localLoading) return <Loader />;

  if (!user) {
    return (
      <div className="text-white text-center mt-20">
        <p>Failed to load profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <Fade duration={2000} triggerOnce>
      <div className="text-white min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1e1e2f] to-[#2f2f4f]">
        {/* Cover Image */}
        <div
          className="h-48 sm:h-64 w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${user.coverImage})` }}
        >
          <div className="absolute bottom-[-40px] left-6">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#0f0f0f] object-cover"
            />
          </div>
        </div>

        {/* Profile & Quick Actions */}
        <div className="pt-20 px-6 sm:px-12 flex flex-col lg:flex-row justify-between items-start gap-6">
          {/* User Info */}
          <div>
            <h1 className="text-2xl font-bold">{user.fullName}</h1>
            <p className="text-zinc-400">@{user.username}</p>
            <p className="mt-2">{user.email}</p>
            <p className="text-sm text-zinc-500 mt-1">
              Member since{" "}
              {new Date(user.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="w-full lg:w-72 bg-[#1c1c2c] rounded-xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 bg-[#2a2a3a] hover:bg-[#35354d] transition-colors p-2 rounded-lg">
                <FiEdit />
                Edit Profile
              </button>
              <button className="w-full flex items-center gap-2 bg-[#2a2a3a] hover:bg-[#35354d] transition-colors p-2 rounded-lg">
                <FiUser />
                Your Channel
              </button>
              <button className="w-full flex items-center gap-2 bg-[#2a2a3a] hover:bg-[#35354d] transition-colors p-2 rounded-lg">
                <FiSettings />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Profile;
