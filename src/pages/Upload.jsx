import React from "react";
import { useAuth } from "../hooks/useAuth";
import VideoUploadForm from "../components/Upload/VideoUploadForm";
import GuestMessage from "../components/Common/GuestMessage";
import Loader from "../components/Loader";

export default function UploadPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />; 
  }

  if (!user) {
    return <GuestMessage
      title="Welcome To Upload Section"
      subtitle="Please log in to upload and manage content."
    />;
  }

  return (
    <div >
        <VideoUploadForm />
    </div>
  );
}
