import React, { useState } from "react";
import { ThumbsUp, SendHorizonal } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { toggleLikeComment } from "../../services/like";
import { addComment } from "../../services/comment";
import toast from "react-hot-toast";
import { timeAgo } from "../../utilis/timeAgo";

const Comments = ({ comments, videoId, refreshComments }) => {
  const { user } = useAuth();
  const validComments = Array.isArray(comments) ? comments : [];
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState({});

  const handlePostComment = async () => {
    if (!user) {
      toast("Please login to post a comment");
      setNewComment("");
      return;
    }

    if (!newComment.trim()) return;

    try {
      await addComment(videoId, newComment);
      setNewComment("");
      refreshComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
      toast.error("Something went wrong");
    }
  };

  const handleToggleLike = async (commentId) => {
    if (!user) {
      toast.error("Login to like comment");
      return;
    }

    try {
      const liked = await toggleLikeComment(commentId);
      setLikedComments((prev) => ({
        ...prev,
        [commentId]: liked,
      }));
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">
        {validComments.length} Comments
      </h3>

      {/* Comment Input */}
      <div className="mb-6 flex gap-4 items-center">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-400" />
        )}
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a public comment..."
          className="bg-transparent border-b border-gray-600 flex-1 focus:outline-none text-sm py-2 text-white"
        />
        <button
          onClick={handlePostComment}
          className="text-gray-400 hover:text-white transition"
        >
          <SendHorizonal size={20} />
        </button>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {validComments.map((comment) => {
          const isLiked = likedComments[comment._id] || false;

          return (
            <div key={comment._id} className="flex gap-4">
              <img
                src={
                  comment.ownerDetails?.avatar ||
                  "https://i.pravatar.cc/40?img=1"
                }
                alt="Commenter"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="text-sm text-gray-400 flex items-center gap-2">
                  {comment.ownerDetails?.username || "Anonymous"} •
                  <span className="text-xs text-gray-400">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-300">
                  {comment.content}
                </p>
                <div
                  onClick={() => handleToggleLike(comment._id)}
                  className={`flex items-center gap-1 text-xs mt-1 cursor-pointer transition-colors ${
                    isLiked ? "text-pink-500" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <ThumbsUp size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
