import { useEffect, useState } from 'react';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import ForgotPasswordForm from './ForgotPasswordForm.jsx';
import { Fade } from 'react-awesome-reveal';

const LoginModal = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    if (isOpen) {
      setCurrentView('login');
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
      onClick={onClose} // close when background is clicked
    >
      <Fade duration={500} triggerOnce>
        <div
          className="bg-[#121212] p-6 rounded-lg w-full max-w-sm text-white shadow-xl z-50"
          onClick={(e) => e.stopPropagation()} // prevent click from bubbling up
        >
          <h2 className="text-xl font-semibold mb-4 text-center">{getTitle()}</h2>

          <Fade key={currentView} duration={800} triggerOnce>
            <div>{renderForm()}</div>
          </Fade>

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
        </div>
      </Fade>
    </div>
  );
};

export default LoginModal;
