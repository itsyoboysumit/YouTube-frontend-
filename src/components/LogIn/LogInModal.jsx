import { useState, useEffect } from 'react';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterFrom.jsx';
import { Fade } from 'react-awesome-reveal';

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(false);

  // 💡 Reset to login form every time modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSignup(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <Fade duration={500} triggerOnce>
        <div className="bg-[#121212] p-6 rounded-lg w-full max-w-sm text-white shadow-xl z-50">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {isSignup ? 'Create an Account' : 'Login to Your Account'}
          </h2>

         
          <Fade key={isSignup ? 'signup' : 'login'} duration={1000} triggerOnce>
            {isSignup ? (
              <RegisterForm onClose={onClose} />
            ) : (
              <LoginForm onClose={onClose} />
            )}
          </Fade>

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
      </Fade>
    </div>
  );
};

export default LoginModal;
