import LoginModal from "./LogInModal";
import useModal from "../../hooks/useModal";

const LoginModalWrapper = () => {
  const { isLoginOpen, closeLoginModal } = useModal();

  return <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />;
};

export default LoginModalWrapper;
