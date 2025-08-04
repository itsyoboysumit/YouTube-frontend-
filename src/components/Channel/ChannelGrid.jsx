// src/components/Channel/ChannelGrid.jsx
import React from 'react';
import ChannelCard from './ChannelCard';

const ChannelGrid = ({ data }) => {
  const normalizedUsers = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-col gap-4 mx-10">
      {normalizedUsers.map((user) =>
        user ? <ChannelCard key={user._id} user={user} /> : null
      )}
    </div>
  );
};

export default ChannelGrid;
