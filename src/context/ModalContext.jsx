import { createContext, useContext, useMemo, useState } from "react";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (type, props = {}) => {
    setModal({ type, props });
  };

  const closeModal = () => {
    setModal(null);
  };

  const value = useMemo(
    () => ({
      modal,
      openModal,
      closeModal,
    }),
    [modal]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal должен использоваться внутри ModalProvider");
  }
  return context;
}
