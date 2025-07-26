import React from "react";
import { useAuth } from "../hooks/useAuth";
import VideoUploadForm from "../components/Upload/VideoUploadForm";
import LoginRequired from "../components/Upload/LoginRequired";
import Loader from "../components/Loader";

export default function UploadPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />; 
  }

  if (!user) {
    return <LoginRequired />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          🎬 Upload New Video
        </h1>
        <VideoUploadForm />
      </div>
    </div>
  );
}
