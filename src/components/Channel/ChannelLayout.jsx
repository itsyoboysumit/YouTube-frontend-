import React, { useState } from 'react';
import ChannelBanner from './ChannelBanner';
import ChannelUserInfo from './ChannelUserInfo';
import ChannelTabs from './ChannelTabs';
import useSubscribe from '../../hooks/useSubscribe';
import ChannelGrid from '../Channel/ChannelGrid';
import Loader from '../Loader'; 
import ChannelVideoContent from './ChannelVideoContent'

const ChannelLayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { subscribers, subscribedChannels, loadingSubscribers, loadingSubscribed } = useSubscribe();

  const isLoading = (activeTab === 1 && loadingSubscribers) || (activeTab === 2 && loadingSubscribed);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <ChannelBanner />
      <div className="w-full mx-auto mt-10 px-0 sm:px-4 ">
        <ChannelUserInfo />
        <ChannelTabs selectedTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6 pb-6">
          {activeTab === 0 && (
            <ChannelVideoContent/>
          )}

          {activeTab === 1 && (
            isLoading ? (
              <Loader />
            ) : subscribers.length > 0 ? (
              <ChannelGrid data={subscribers} />
            ) : (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">No Subscribers yet</p>
            )
          )}

          {activeTab === 2 && (
            isLoading ? (
              <Loader />
            ) : subscribedChannels.length > 0 ? (
              <ChannelGrid data={subscribedChannels} />
            ) : (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">No Subscribed Channels yet</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelLayout;
