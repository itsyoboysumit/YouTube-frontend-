import React, { useState } from 'react';

const categories = [
  'All',
  'Gaming',
  'Music',
  'Live',
  'React',
  'JavaScript',
  'Programming',
  'News',
  'Cooking',
  'Sports',
  'Podcasts'
];

const CategoriesBar = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="sticky top-16 bg-[#0f0f0f] py-3 z-30">
      <div
        className="flex space-x-3 overflow-x-auto whitespace-nowrap px-4 pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesBar;
