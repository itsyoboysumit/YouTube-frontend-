// src/components/Channel/ChannelCard.jsx
import React from 'react';

const ChannelCard = ({ user }) => {
  if (!user) return null;

  return (
    <div
      className="flex flex-row items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl hover:shadow-md transition w-full cursor-default"
    >
      <img
        src={user.avatar}
        alt={user.username}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="text-left">
        <h4 className="text-base font-semibold">{user.fullName}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
      </div>
    </div>
  );
};

export default ChannelCard;
