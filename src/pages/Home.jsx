import React from 'react';
import { useVideos } from '../hooks/useVideo.js';
import VideoGrid from '../components/VideoGrid/VideoGrid.jsx';
import Loader from '../components/Loader'; 

const Home = () => {
  console.log("Home component rendered");
  const { videos, loading } = useVideos();

  if (loading) return <Loader />; 

  return <VideoGrid videos={videos} />;
};

export default Home;