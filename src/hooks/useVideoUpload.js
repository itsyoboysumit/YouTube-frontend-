import { useState } from "react";
import { uploadVideo } from "../services/video";

const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_VIDEO_SIZE_MB = 50;

export function useVideoUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === Validation Helpers ===
  const isValidFileType = (file, validTypes) => {
    return file && validTypes.includes(file.type);
  };

  const isUnderSizeLimit = (file, maxMB) => {
    return file && file.size / (1024 * 1024) <= maxMB;
  };

  // === Handle Text Inputs ===
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setTitle(value);
        if (value.trim() !== "") setErrors((prev) => ({ ...prev, title: null }));
        break;
      case "description":
        setDescription(value);
        if (value.trim() !== "") setErrors((prev) => ({ ...prev, description: null }));
        break;
      default:
        break;
    }
  };

  // === Handle File Inputs ===
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    const newErrors = { ...errors };

    if (field === "videoFile") {
      if (!file) {
        newErrors.videoFile = "Please upload a video file.";
      } else if (!isValidFileType(file, VIDEO_TYPES)) {
        newErrors.videoFile = "Invalid video format.";
        setVideoFile(null);
        setVideoPreview(null);
      } else if (!isUnderSizeLimit(file, MAX_VIDEO_SIZE_MB)) {
        newErrors.videoFile = "Video file must be under 50MB.";
        setVideoFile(null);
        setVideoPreview(null);
      } else {
        setVideoFile(file);
        setVideoPreview(URL.createObjectURL(file));
        newErrors.videoFile = null;
      }
    }

    if (field === "thumbnail") {
      if (!file) {
        newErrors.thumbnail = "Please upload a thumbnail image.";
      } else if (!isValidFileType(file, IMAGE_TYPES)) {
        newErrors.thumbnail = "Invalid image format.";
        setThumbnail(null);
        setThumbnailPreview(null);
      } else {
        setThumbnail(file);
        setThumbnailPreview(URL.createObjectURL(file));
        newErrors.thumbnail = null;
      }
    }

    setErrors(newErrors);
  };

  // === Handle Form Submit ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!videoFile) newErrors.videoFile = "Video file is required.";
    if (!thumbnail) newErrors.thumbnail = "Thumbnail image is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await uploadVideo({ title, description, videoFile, thumbnail });
      // Optionally, reset form or redirect
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnail(null);
      setVideoPreview(null);
      setThumbnailPreview(null);
      setErrors({});
      alert("Video uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Video upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    description,
    videoPreview,
    thumbnailPreview,
    errors,
    isSubmitting,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
}
