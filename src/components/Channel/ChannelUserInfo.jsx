import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { timeAgo } from '../../utilis/timeAgo';
import { Pencil, Users, Radio, Check, X } from 'lucide-react';
import { getChannelProfile, updateAccount } from '../../services/auth';

const ChannelUserInfo = () => {
  const { user, setUser } = useAuth(); 
  const [channelData, setChannelData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({ fullName: '' });

  useEffect(() => {
    if (user?.username) {
      getChannelProfile(user.username)
        .then((res) => setChannelData(res.data))
        .catch((err) => console.error('Error fetching channel data:', err));
    }

    if (user) {
      setFormData({ fullName: user.fullName });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const payload = {};
      if (editingField === 'fullName') payload.fullName = formData.fullName;

      const updatedUser = await updateAccount(payload);
      setUser(updatedUser.data); 
      setEditingField(null);
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };

  if (!user) return null;

  return (
    <div className="px-6 py-8 bg-white dark:bg-black text-black dark:text-white shadow-md rounded-lg transition-all">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
        {/* Left Side: Full Name and Email */}
        <div className="flex flex-col gap-3">
          {/* Full Name */}
          <div className="flex items-center gap-2">
            {editingField === 'fullName' ? (
              <>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none"
                />
                <Check size={18} className="text-green-500 cursor-pointer" onClick={handleSave} />
                <X size={18} className="text-red-500 cursor-pointer" onClick={() => setEditingField(null)} />
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold">{user.fullName}</h1>
                <Pencil
                  size={20}
                  className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                  onClick={() => setEditingField('fullName')}
                />
              </>
            )}
          </div>

          {/* Static Email Display Only */}
          <p className="text-md text-gray-500 dark:text-gray-300">{user.email}</p>
        </div>

        {/* Right Side: Username and Member Since */}
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 shadow-sm text-sm space-y-2 w-full md:w-auto">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {/* Subscribers */}
          <div className="group flex items-center gap-4 p-5 rounded-xl shadow hover:shadow-xl bg-gradient-to-tr from-zinc-900 to-zinc-800 transition hover:scale-[1.02]">
            <div className="bg-zinc-700 p-3 rounded-full text-white group-hover:text-red-400 transition">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-400">Subscribers</p>
              <p className="text-2xl font-bold text-white">{channelData.subscribersCount}</p>
            </div>
          </div>

          {/* Subscribed Channels */}
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
