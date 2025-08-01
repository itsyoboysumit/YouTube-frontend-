// src/components/VideoPlayerPage/ChannelInfo.jsx
import { toast } from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { getSubscribers } from "../../services/subscription";
import { useState, useEffect } from "react";
import { toggleSubscription } from "../../services/subscription";

const ChannelInfo = ({ video }) => {
  const { user } = useAuth();
  const [subscribersCount, setSubscriberscount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(video.isSubscribed || false);

  useEffect(() => {
    const fetchSubscribersCount = async () => {
      try {
        if (!video.owner?._id) return;
        const subscribers = await getSubscribers(video.owner?._id);
        setSubscriberscount(subscribers.length);
      } catch (err) {
        console.error("Error fetching subscribers count:", err);
        setSubscriberscount(0);
      }
    };
    fetchSubscribersCount();
  }, [video.owner?._id]);

  useEffect(() => {
    if (!user) {
      setIsSubscribed(false);
    } else {
      setIsSubscribed(video.isSubscribed || false);
    }
  }, [user, video.isSubscribed]);

  const subscribeHandler = async () => {
    if (!user) {
      toast("Please login to subscribe");
      return;
    }
    try {
      toggleSubscription(video.owner?._id);
      setIsSubscribed((prev) => !prev);
    } catch (err) {
      console.error("Error toggling subscription:", err);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6 border-b border-gray-700 pb-4">
      <div className="flex items-center gap-4">
        <img
          src={video.owner?.avatar || "https://i.pravatar.cc/40"}
          alt="Channel Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-base">
            {video.owner?.username || "Unknown"}
          </h2>
          <p className="text-sm text-gray-400">{`Subscribers: ${subscribersCount}`}</p>
        </div>
      </div>
      <button
        onClick={subscribeHandler}
        className={`px-4 py-2 rounded-full font-semibold transition 
    ${
      isSubscribed
        ? "bg-gray-800 text-white hover:bg-gray-700"
        : "bg-white text-black hover:bg-gray-200"
    }
    ${!user ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default ChannelInfo;
