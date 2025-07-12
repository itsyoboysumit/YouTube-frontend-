// 1200 → "1.2K", 1500000 → "1.5M"
export const formatViews = (num = 0) => {
  if (num < 1000) return num;
  if (num < 1_000_000) return (num / 1000).toFixed(1) + "K";
  return (num / 1_000_000).toFixed(1) + "M";
};
