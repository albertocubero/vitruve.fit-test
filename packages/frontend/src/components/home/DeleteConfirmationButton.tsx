import React from 'react';

interface DeleteConfirmationButtonProps {
  onConfirm: () => void;
}

const DeleteConfirmationButton: React.FC<DeleteConfirmationButtonProps> = ({ onConfirm }) => {
  const handleClick = () => {
    if (window.confirm("Are you sure?")) {
      onConfirm();
    }
  };

  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteConfirmationButton;