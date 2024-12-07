import React from "react";

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button className="x-button -mr-1 w-4" onClick={onClose}>
      <img src="/close.png" alt="Close" className="close" />
    </button>
  );
};

export default CloseButton;
