import React from 'react';
import { Fade } from 'react-awesome-reveal';
import HomeVideoSection from './HomeVideoSection';

const Home = () => {
  return (
    <Fade duration={1000} triggerOnce>
      <HomeVideoSection />
    </Fade>
  );
};

export default Home;
