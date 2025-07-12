// "5 minutes ago", "2 days ago"
export const timeAgo = (dateString) => {
  const time = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - time) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return time.toLocaleDateString();
};
