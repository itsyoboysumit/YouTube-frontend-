import { useEffect, useState } from 'react';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import ForgotPasswordForm from './ForgotPasswordForm.jsx';
import { Fade } from 'react-awesome-reveal';

const LoginModal = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    if (isOpen) {
      setCurrentView('login'); // Reset view when modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Title based on current view
  const getTitle = () => {
    switch (currentView) {
      case 'signup':
        return 'Create an Account';
      case 'forgot':
        return 'Reset Your Password';
      default:
        return 'Login to Your Account';
    }
  };

  // Renders the appropriate form view
  const renderForm = () => {
    if (currentView === 'signup') {
      return <RegisterForm onClose={onClose} />;
    }
    if (currentView === 'forgot') {
      return <ForgotPasswordForm onClose={onClose} />;
    }

    return (
      <div>
        <LoginForm
          onClose={onClose}
          onForgotPassword={() => setCurrentView('forgot')}
        />
        <div className="mt-3 text-sm text-center">
          <button
            onClick={() => setCurrentView('forgot')}
            className="text-blue-400 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    );
  };

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
          {/* Title */}
          <h2 className="text-xl font-semibold mb-4 text-center">{getTitle()}</h2>

          {/* Dynamic Form */}
          <Fade key={currentView} duration={800} triggerOnce>
            <div>{renderForm()}</div>
          </Fade>

          {/* View Switcher (only for login/signup) */}
          {currentView !== 'forgot' && (
            <p className="text-sm text-gray-400 text-center mt-4">
              {currentView === 'signup'
                ? 'Already have an account? '
                : "Don't have an account? "}
              <button
                onClick={() =>
                  setCurrentView(currentView === 'signup' ? 'login' : 'signup')
                }
                className="text-blue-500 hover:underline"
              >
                {currentView === 'signup' ? 'Login' : 'Sign Up'}
              </button>
            </p>
          )}

          {/* Cancel Button */}
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
