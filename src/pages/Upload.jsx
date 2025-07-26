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
    <div >
        <VideoUploadForm />
    </div>
  );
}
