import React, { useState } from "react";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LoginModal from "./components/LogIn/LogInModal.jsx";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider.jsx";
import { Routes, Route } from "react-router-dom";
import VideoPlayerPage from "./pages/VideoPlyaerPage.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import MyVideos from "./pages/MyVideos.jsx";
import WatchHistory from "./pages/WatchHistory.jsx";
import PlaylistList from "./pages/Playlist/PlaylistList.jsx";
import PlaylistVideoPage from "./pages/Playlist/PlaylistVideo.jsx"; 
const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#333", color: "#fff" },
          duration: 1200,
        }}
      />

      <Layout onLoginClick={() => setIsLoginOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watch/:videoId" element={<VideoPlayerPage />} />
          <Route
            path="/liked"
            element={<LikedVideos onLoginClick={() => setIsLoginOpen(true)} />}
          />
          <Route path="/my-videos" element={<MyVideos />} />
          <Route path="/history" element={<WatchHistory />} />
          <Route path="/playlists" element={<PlaylistList />} />
          <Route path="/playlist/:playlistId" element={<PlaylistVideoPage />} />
        </Routes>
      </Layout>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </AuthProvider>
  );
};

export default App;
