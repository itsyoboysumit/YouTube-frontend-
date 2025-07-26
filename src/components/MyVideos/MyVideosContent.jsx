import React from "react";
import VideoGrid from "../VideoGrid/VideoGrid";
import { Fade } from "react-awesome-reveal";

export default function MyVideosContent({ videos }) {
  return (
    <Fade duration={1000} triggerOnce>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Your Uploaded Videos</h2>
        <VideoGrid videos={videos} />
      </div>
    </Fade>
  );
}
