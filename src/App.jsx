import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import VideoPlayerPage from "./pages/VideoPlyaerPage.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import MyVideos from "./pages/MyVideos.jsx";
import WatchHistory from "./pages/WatchHistory.jsx";
import PlaylistList from "./pages/Playlist/PlaylistList.jsx";
import PlaylistVideoPage from "./pages/Playlist/PlaylistVideo.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadPage from "./pages/Upload.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import RouteChangeLoader from "./components/Common/RouteChangeLoader.jsx";
import SearchResultPage from "./pages/SearchResultPage.jsx";
import ChannelPage from "./pages/ChannelPage.jsx";

import AuthProvider from "./context/AuthProvider.jsx";
import ModalProvider from "./context/ModalProvider.jsx"; 
import LoginModalWrapper from "./components/LogIn/LoginModalWrapper.jsx"; 

const App = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <RouteChangeLoader />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#333", color: "#fff" },
            duration: 1200,
          }}
        />

        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watch/:videoId" element={<VideoPlayerPage />} />
            <Route path="/liked" element={<LikedVideos />} />
            <Route path="/my-videos" element={<MyVideos />} />
            <Route path="/history" element={<WatchHistory />} />
            <Route path="/playlists" element={<PlaylistList />} />
            <Route path="/playlist/:playlistId" element={<PlaylistVideoPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/channel" element={<ChannelPage />} />
          </Routes>
        </Layout>
        <LoginModalWrapper />
      </ModalProvider>
    </AuthProvider>
  );
};

export default App;
