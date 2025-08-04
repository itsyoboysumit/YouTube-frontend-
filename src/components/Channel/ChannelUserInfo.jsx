import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { timeAgo } from '../../utilis/timeAgo';
import { Pencil, Users, Radio } from 'lucide-react';
import { getChannelProfile } from '../../services/auth';

const ChannelUserInfo = () => {
  const { user } = useAuth();
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    if (user?.username) {
      getChannelProfile(user.username)
        .then((res) => setChannelData(res.data))
        .catch((err) => console.error('Error fetching channel data:', err));
    }
  }, [user?.username]);

  if (!user) return null;

  return (
    <div className="px-6 py-8 bg-white dark:bg-black text-black dark:text-white shadow-md rounded-lg transition-all max-w-screen-lg ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-star tmd:items-center gap-6 md:gap-6 lg:gap-6 xl:gap-6 mb-6">
        {/* Left Side: Full Name and Email */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold">{user.fullName}</h1>
            <Pencil size={20} className="text-gray-400 cursor-pointer hover:text-red-500 transition" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-md text-gray-500 dark:text-gray-300">{user.email}</p>
            <Pencil size={18} className="text-gray-400 cursor-pointer hover:text-red-500 transition" />
          </div>
        </div>

        {/* Right Side: Username and Member Since */}
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 shadow-sm text-sm space-y-2 w-full md:w-auto lg:w-auto xl:w-auto">
          <p>
            <span className="font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">Username:</span>{' '}
            <span className="text-black dark:text-white">{user.username}</span>
          </p>
          <p>
            <span className="font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">Member since:</span>{' '}
            <span className="text-black dark:text-white">{timeAgo(user.createdAt)}</span>
          </p>
        </div>
      </div>

      {/* Stats Section */}
      {channelData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-15">
          {/* Subscribers Card */}
          <div className="group flex items-center gap-4 p-5 rounded-xl shadow hover:shadow-xl bg-gradient-to-tr from-zinc-900 to-zinc-800 transition hover:scale-[1.02]">
            <div className="bg-zinc-700 p-3 rounded-full text-white group-hover:text-red-400 transition">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-400">Subscribers</p>
              <p className="text-2xl font-bold text-white">{channelData.subscribersCount}</p>
            </div>
          </div>

          {/* Subscribed Channels Card */}
          <div className="group flex items-center gap-4 p-5 rounded-xl shadow hover:shadow-xl bg-gradient-to-tr from-zinc-900 to-zinc-800 transition hover:scale-[1.02]">
            <div className="bg-zinc-700 p-3 rounded-full text-white group-hover:text-red-400 transition">
              <Radio size={28} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-400">Subscribed Channels</p>
              <p className="text-2xl font-bold text-white">{channelData.channelsSubscribedToCount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelUserInfo;
