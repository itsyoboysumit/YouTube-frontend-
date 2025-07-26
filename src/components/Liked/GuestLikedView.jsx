import { BsPersonFillExclamation } from "react-icons/bs";
import { LiaSignInAltSolid } from "react-icons/lia";
import useModal from "../../hooks/useModal";

const GuestView = () => {
  const { openLoginModal } = useModal(); 

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center px-4">
        <div className="flex justify-center mb-4 text-5xl text-zinc-400">
          <BsPersonFillExclamation />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-zinc-300">
          Keep track of what you like
        </h2>
        <p className="text-zinc-200 mb-4">Sign in to see your liked videos.</p>

        <div className="flex justify-center">
          <button
            onClick={openLoginModal} 
            className="mt-2 px-4 py-2 bg-gray-600 hover:bg-red-700 rounded-full flex items-center gap-2 text-white transition duration-200"
          >
            <LiaSignInAltSolid className="text-xl" />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestView;
