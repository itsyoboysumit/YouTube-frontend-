import { useState } from "react";
import ModalContext from "./ModalContext";

const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  return (
    <ModalContext.Provider value={{ isLoginOpen, openLoginModal, closeLoginModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
