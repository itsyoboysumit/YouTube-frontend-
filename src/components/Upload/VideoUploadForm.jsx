import React from "react";
import { useVideoUpload } from "../../hooks/useVideoUpload";

export default function VideoUploadForm() {
  const {
    title,
    description,
    videoPreview,
    thumbnailPreview,
    errors,
    isSubmitting,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useVideoUpload();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">🎬 Upload New Video</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter video title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description *</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            className={`w-full p-2 border rounded resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Write a short description"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block mb-1 font-medium">Video File *</label>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            name="videoFile"
            onChange={(e) => handleFileChange(e, "videoFile")}
            className={`block w-full border p-2 rounded ${
              errors.videoFile ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.videoFile && <p className="text-red-500 text-sm mt-1">{errors.videoFile}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Note: Video must be under 50MB and in .mp4, .webm, or .mov format.
          </p>
          {videoPreview && (
            <video controls src={videoPreview} className="mt-3 rounded w-full max-h-64" />
          )}
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block mb-1 font-medium">Thumbnail *</label>
          <input
            type="file"
            accept="image/*"
            name="thumbnail"
            onChange={(e) => handleFileChange(e, "thumbnail")}
            className={`block w-full border p-2 rounded ${
              errors.thumbnail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="Thumbnail Preview" className=" mt-3 mx-auto block rounded w-[320px] h-[180px] object-cover" />
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-60"
          >
            {isSubmitting ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </form>
    </div>
  );
}
