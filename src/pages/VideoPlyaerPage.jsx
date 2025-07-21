import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideoById, getAllVideos, updateVideoViewCount } from '../services/video';
import { getVideoComments } from '../services/comment';
import Loader from '../components/Loader'; 

import VideoPlayer from '../components/VideoPlayerPage/VideoPlayer';
import VideoDetails from '../components/VideoPlayerPage/VideoDetails';
import ChannelInfo from '../components/VideoPlayerPage/ChannelInfo';
import Comments from '../components/VideoPlayerPage/Comments';
import RecommendedVideos from '../components/VideoPlayerPage/RecommendedVideos';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideoData = async () => {
      try {
        setLoading(true);
        const fetchedVideo = await getVideoById(videoId);
        const fetchedComments = await getVideoComments(videoId);
        const allVideos = await getAllVideos();
        updateVideoViewCount(videoId); // Update view count for the video

        setVideo(fetchedVideo);
        setComments(fetchedComments);
        setRecommended(allVideos.filter(v => v._id !== videoId));
      } catch (error) {
        console.error("Error loading video:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVideoData();
  }, [videoId]);

  const fetchComments = async () => {
  try {
    const fetchedComments = await getVideoComments(videoId);
    setComments(fetchedComments);
  } catch (err) {
    console.error("Failed to fetch comments:", err);
  }
};


  if (loading || !video) return (
  <div className="flex justify-center items-center h-[80vh]">
    <Loader />
  </div>
);


  return (
    <div className="flex flex-col  bg-[#0f0f0f] text-white min-h-screen">
      <div className="flex flex-col lg:flex-row px-4 lg:px-12 gap-6">
        <div className="flex-1 w-full">
          <VideoPlayer videoUrl={video.videoFile} />
          <VideoDetails video={video} />
          <ChannelInfo video={video} />
          <Comments comments={comments} videoId={videoId} refreshComments={fetchComments}/>
        </div>
        <div className="w-full lg:w-[400px]">
          <RecommendedVideos videos={recommended} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
