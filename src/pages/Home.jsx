import React from 'react';
import { useVideos } from '../hooks/useVideo.js';
import VideoGrid from '../components/VideoGrid/VideoGrid.jsx';
import Loader from '../components/Loader';
import { Fade } from 'react-awesome-reveal'; // 👈 Import Fade

const Home = () => {
  const { videos, loading } = useVideos();

  if (loading) return <Loader />;

  return (
    <Fade duration={1000} triggerOnce>
      <VideoGrid videos={videos} />
    </Fade>
  );
};

export default Home;
