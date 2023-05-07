import { useState, useCallback } from "react";

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const modalProps = {
    open: isOpen,
    onClose: closeModal,
  };

  return { openModal, closeModal, open: isOpen };
};

export default useModal;
