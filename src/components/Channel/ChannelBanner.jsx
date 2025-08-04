import React from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ChannelBanner = () => {
  const { user } = useAuth();

  const avatarUrl = user?.avatar || 'https://via.placeholder.com/100';
  const coverImageUrl = user?.coverImage || null;

  const handleAvatarChange = () => {
    // Trigger avatar upload (we'll implement this)
    document.getElementById('avatarInput').click();
  };

  const handleCoverImageChange = () => {
    // Trigger cover image upload
    document.getElementById('coverInput').click();
  };

  return (
    <div
      className="relative h-55 bg-gray-300 dark:bg-gray-800"
      style={{
        backgroundImage: coverImageUrl ? `url(${coverImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Cover Image Update Icon */}
      <button
        onClick={handleCoverImageChange}
        className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-900 p-2 rounded-full border border-gray-300 hover:scale-105 transition"
        title="Change Cover Image"
      >
        <Camera size={18} />
      </button>
      <input
        id="coverInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            // Call upload function
            console.log("Cover image selected:", file);
          }
        }}
      />

      {/* Avatar */}
      <div className="absolute -bottom-12 left-6">
        <div className="relative">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-40 h-40 rounded-full border-4 border-white dark:border-black object-cover "
          />
          {/* Avatar Camera Icon */}
          <button
            onClick={handleAvatarChange}
            className="absolute bottom-0 right-0 bg-gray-100 dark:bg-gray-900 p-1 rounded-full border border-gray-300 hover:scale-105 transition"
            title="Change Avatar"
          >
            <Camera size={16} />
          </button>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                // Call upload function
                console.log("Avatar image selected:", file);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelBanner;
