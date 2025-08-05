import React from "react";
import ChannelLayout from "../components/Channel/ChannelLayout";
import GuestMessage from "../components/Common/GuestMessage";
import { useAuth } from "../hooks/useAuth";
const ChannelPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <GuestMessage
        title="Explore Channels"
        subtitle="Sign in to view and manage your own channel and subscriptions."
      />
    );
  }

  return <ChannelLayout />;
};

export default ChannelPage;
