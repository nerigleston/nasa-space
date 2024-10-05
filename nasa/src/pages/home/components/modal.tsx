import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-4/5 h-4/5 p-6 rounded-lg shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-xl"
          >
            &times;{" "}
            {/* Usando o símbolo de multiplicação como ícone de fechar */}
          </button>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
