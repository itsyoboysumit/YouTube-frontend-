import { Fade } from "react-awesome-reveal";
import { FiVideo, FiEye, FiUserPlus, FiThumbsUp } from "react-icons/fi";

const DashboardContent = ({ user, stats }) => {
  return (
    <Fade duration={2000} triggerOnce>
      <div className="text-white min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#181818] to-[#202020]">
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

        {/* Content Layout */}
        <div className="pt-20 px-6 sm:px-12 pb-16 flex flex-col lg:flex-row gap-10 items-start">
          {/* User Info */}
          <div className="flex-1 max-w-sm">
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

          {/* Stats */}
          <div className="flex-[2] grid grid-cols-1  md:grid-cols-2 gap-6 w-full">
            <StatCard icon={<FiVideo size={28} />} label="Total Videos" value={stats.totalVideos} />
            <StatCard icon={<FiEye size={28} />} label="Total Views" value={stats.totalViews} />
            <StatCard icon={<FiUserPlus size={28} />} label="Subscribers" value={stats.totalSubscribers} />
            <StatCard icon={<FiThumbsUp size={28} />} label="Total Likes" value={stats.totalLikes} />
          </div>
        </div>
      </div>
    </Fade>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-[#262525] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex items-center gap-4 min-h-[110px]">
    <div className="text-[#FF0000]">{icon}</div> {/* YouTube red */}
    <div>
      <h4 className="text-base text-zinc-300">{label}</h4>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export default DashboardContent;
