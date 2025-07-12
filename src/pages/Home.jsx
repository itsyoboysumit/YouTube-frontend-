import React from 'react';
import { useVideos } from '../hooks/useVideo.js';
import VideoGrid from '../components/VideoGrid/VideoGrid.jsx';

const Home = () => {
  console.log("Home component rendered");
  const { videos, loading } = useVideos();

  if (loading) return <div className="text-white">Loading...</div>;

  return <VideoGrid videos={videos} />;
};

export default Home;
