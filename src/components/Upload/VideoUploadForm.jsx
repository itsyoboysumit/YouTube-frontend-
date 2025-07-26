import React from "react";
import { useVideoUpload } from "../../hooks/useVideoUpload";
import { FaFileUpload } from "react-icons/fa";

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
    <div className="max-w-3xl mx-auto p-6 bg-gray-950 text-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center gap-3 mb-6">
        <FaFileUpload className="text-2xl" />
        <span className="text-xl font-semibold">Upload Video</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 border ${
              errors.title ? "border-red-500" : "border-gray-700"
            } outline-none ring-0`}
            placeholder="Enter video title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description *</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            className={`w-full p-2 rounded resize-none bg-gray-900 text-white placeholder-gray-500 border ${
              errors.description ? "border-red-500" : "border-gray-700"
            } outline-none ring-0`}
            placeholder="Write a short description"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Video File *</label>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            name="videoFile"
            onChange={(e) => handleFileChange(e, "videoFile")}
            className={`block w-full p-2 rounded bg-gray-900 text-white border ${
              errors.videoFile ? "border-red-500" : "border-gray-700"
            } outline-none ring-0 file:bg-gray-800 file:text-white file:border-0 file:px-3 file:py-1 file:rounded`}
          />
          {errors.videoFile && <p className="text-red-500 text-sm mt-1">{errors.videoFile}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Note: Video must be under 50MB and in .mp4, .webm, or .mov format.
          </p>
          {videoPreview && (
            <video controls src={videoPreview} className="mt-3 rounded w-full max-h-64" />
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Thumbnail *</label>
          <input
            type="file"
            accept="image/*"
            name="thumbnail"
            onChange={(e) => handleFileChange(e, "thumbnail")}
            className={`block w-full p-2 rounded bg-gray-900 text-white border ${
              errors.thumbnail ? "border-red-500" : "border-gray-700"
            } outline-none ring-0 file:bg-gray-800 file:text-white file:border-0 file:px-3 file:py-1 file:rounded`}
          />
          {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-3 mx-auto block rounded w-[320px] h-[180px] object-cover"
            />
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-60 outline-none ring-0"
          >
            {isSubmitting ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </form>
    </div>
  );
}
