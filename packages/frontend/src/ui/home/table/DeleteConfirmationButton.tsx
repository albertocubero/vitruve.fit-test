import React from 'react';
import { useDeleteAthlete } from '../../hooks/athlete/useDeleteAthlete';

interface DeleteConfirmationButtonProps {
  athleteId: string;
}

const DeleteConfirmationButton: React.FC<DeleteConfirmationButtonProps> = ({
  athleteId,
}) => {
  const { deleteAthlete } = useDeleteAthlete();

  const handleClick = () => {
    if (window.confirm('Are you sure?')) {
      deleteAthlete(athleteId);
    }
  };

  return (
    <button
      className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        ></path>
      </svg>
    </button>
  );
};

export default DeleteConfirmationButton;
