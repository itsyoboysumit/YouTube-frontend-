import { useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";

export default function PlaylistCard({ playlist, onUpdate, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent click if clicking delete or update buttons
    if (e.target.closest("button")) return;
    navigate(`/playlist/${playlist._id}`);
  };

  const thumbnail =
    playlist.videos?.[0]?.thumbnail ||
    "https://via.assets.so/img.jpg?"

  return (
    <div
      className="bg-zinc-900 rounded-xl overflow-hidden shadow relative cursor-pointer hover:scale-[1.02] transition-transform"
      onClick={handleCardClick}
    >
      <img
        src={thumbnail}
        alt={playlist.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-3 space-y-1">
        <h3 className="text-white text-lg font-semibold line-clamp-1">
          {playlist.name}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-1">
          {playlist.description}
        </p>
        <p className="text-xs text-gray-500">
          {playlist.videos.length} videos
        </p>
      </div>

      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate();
          }}
          className="bg-zinc-800 opacity-70 p-1 rounded hover:bg-zinc-500"
        >
          <Pencil className="w-4 h-4 text-white" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="bg-zinc-800 opacity-70 p-1 rounded hover:bg-zinc-500"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
