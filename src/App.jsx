import React, { useState } from 'react';
import Layout from './layout/Layout.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile'; 
import LoginModal from './components/LogIn/LogInModal.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './context/AuthProvider.jsx';
import { Routes, Route } from 'react-router-dom'; 
import VideoPlayerPage from './pages/VideoPlyaerPage.jsx';
import LikedVideos from './pages/LikedVideos.jsx'; 
const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#333', color: '#fff' },
          duration: 1200,
        }}
      />

      <Layout onLoginClick={() => setIsLoginOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watch/:videoId" element={<VideoPlayerPage />} /> 
          <Route path="/liked" element={<LikedVideos onLoginClick={() => setIsLoginOpen(true)} />} />
        </Routes>
      </Layout>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </AuthProvider>
  );
};

export default App;
