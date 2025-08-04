const tabs = ['My Videos', 'My Subscribers', 'Subscribed Channels'];

const ChannelTabs = ({ selectedTab, onTabChange }) => {
  const handleTabClick = (index) => {
    onTabChange(index);
  };

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700 mt-6">
      <div className="flex justify-center space-x-4 sm:space-x-8 px-4 sm:px-8 py-3">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => handleTabClick(index)}
            className={`text-sm sm:text-base font-medium pb-2 transition-colors duration-200 border-b-2 ${
              selectedTab === index
                ? 'border-zinc-100 text-zinc-100 dark:text-zinc-100'
                : 'border-transparent text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChannelTabs;
