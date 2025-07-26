import { BsPersonFillExclamation } from "react-icons/bs";

const GuestPlaylistView = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center px-4">
        <div className="flex justify-center mb-4 text-5xl text-zinc-400">
          <BsPersonFillExclamation />
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome to Playlist Page</h2>
        <p className="text-zinc-400">Please log in to manage your playlists.</p>
      </div>
    </div>
  );
};

export default GuestPlaylistView;
