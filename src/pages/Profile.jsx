import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getCurrentUser } from "../services/auth";
import Loader from "../components/Loader"; // ✅ import reusable loader

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
        console.error("Failed to load user profile:", err);
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
    <div className="text-white min-h-screen bg-[#0f0f0f]">
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

      {/* Profile Info */}
      <div className="pt-20 px-6 sm:px-12">
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
    </div>
  );
};

export default Profile;