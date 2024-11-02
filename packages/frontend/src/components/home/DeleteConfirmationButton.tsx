import React from 'react';
import { useDeleteAthlete } from '../../hooks/athlete/useDeleteAthlete';

interface DeleteConfirmationButtonProps {
  athleteId: string;
}

const DeleteConfirmationButton: React.FC<DeleteConfirmationButtonProps> = ({ athleteId }) => {
  const { deleteAthlete } = useDeleteAthlete();

  const handleClick = () => {
    if (window.confirm("Are you sure?")) {
      deleteAthlete(athleteId)
    }
  };

  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteConfirmationButton;