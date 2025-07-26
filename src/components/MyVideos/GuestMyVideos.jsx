import { BsPersonFillExclamation } from "react-icons/bs";

const GuestView = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center px-4">
        <div className="flex justify-center mb-4 text-5xl text-zinc-400">
          <BsPersonFillExclamation />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-zinc-300">Welcome to content section.</h2>
        <p className="text-zinc-200">Please sign in to see your content.</p>
      </div>
    </div>
  );
};

export default GuestView;
