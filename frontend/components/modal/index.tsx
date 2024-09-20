import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="relative bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-lg shadow-md p-5 w-11/12 max-w-3xl">
        <div className="flex absolute top-2 right-2">
          <button onClick={closeModal}>✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
