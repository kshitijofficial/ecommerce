import React from "react";
import "./componentUtility.css";
import { XCircle } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-body shadow-2xl px-4" onClick={onClose}>
      <div
        className="relative bg-cardBg  p-8 rounded-md shadow-2xl max-w-md w-full text-center border border-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <XCircle
          className="absolute top-3 right-3 text-primary cursor-pointer"
          size={24}
          strokeWidth={2.5}
          onClick={onClose}
        />

        {children}
      </div>
    </div>
  );
};

export default Modal;
