import React from "react";

import { XCircle } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-body-wrapper" onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <XCircle
          className="icon-xcircle"
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
