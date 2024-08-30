import React, { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[calc(100vh-2rem)] bg-gray-800 rounded-lg overflow-y-auto"
      >
        <div className="sticky top-0 z-10 flex justify-end p-4 bg-gray-800">
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors duration-200 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
