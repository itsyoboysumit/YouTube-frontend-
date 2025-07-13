// src/components/LoginModal.jsx
import { useState } from 'react';
import LoginForm from './LogInform.jsx';
import RegisterForm from './RegisterFrom.jsx';


const LoginModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  
        backdropFilter: 'blur(2px)',             
      }}
    >
      <div className="bg-[#121212] p-6 rounded-lg w-full max-w-sm text-white shadow-xl z-50">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isSignup ? 'Create an Account' : 'Login to Your Account'}
        </h2>

        {isSignup ? (
          <RegisterForm onClose={onClose} />
        ) : (
          <LoginForm onClose={onClose} />
        )}

        <p className="text-sm text-gray-400 text-center mt-4">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 hover:underline"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>

        <button
          onClick={onClose}
          className="text-xs mt-4 text-gray-400 hover:text-white w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
