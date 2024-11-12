import React, { useState } from 'react';
import DeleteAthleteModal from './DeleteAthleteModal';
import TrashIcon from './DeleteIcon';

interface DeleteConfirmationButtonProps {
  athleteId: string;
}

const DeleteConfirmationButton: React.FC<DeleteConfirmationButtonProps> = ({
  athleteId,
}) => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
        onClick={openModalHandler}
      >
        <TrashIcon />
      </button>
      {showModal && <DeleteAthleteModal athleteId={athleteId} closeModal={closeModalHandler} />}
    </>
  );
};

export default React.memo(DeleteConfirmationButton);
