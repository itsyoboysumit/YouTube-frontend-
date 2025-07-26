
import React from "react";
import { Link } from "react-router-dom";

export default function LoginRequired() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-950 px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-zinc-800 dark:text-white mb-4">
        🚫 You must be logged in to access this page
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Please log in to upload videos and manage your content.
      </p>
      <Link
        to="/login"
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
