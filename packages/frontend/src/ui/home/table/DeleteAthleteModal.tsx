import React from 'react';
import TrashIcon from './DeleteIcon';
import { useDeleteAthlete } from '../../hooks/athlete/useDeleteAthlete';

interface DeleteAthleteModalProps {
  athleteId: string;
  closeModal: () => void;
}

const DeleteAthleteModal: React.FC<DeleteAthleteModalProps> = ({
  athleteId,
  closeModal,
}) => {
  const { deleteAthlete } = useDeleteAthlete();

  const handleClick = () => {
    deleteAthlete(athleteId);
    closeModal();
  };

  return (
    <div className="relative flex justify-center">
      <>
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-out"></div>

        <div
          className="fixed inset-0 z-20 overflow-y-auto transition-opacity duration-300 ease-out"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              role="document"
            >
              <div className="flex items-center justify-center">
                <TrashIcon />
              </div>

              <div className="mt-2 text-center">
                <h3
                  className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                  id="modal-title"
                >
                  Remove User
                </h3>
                <p className="w-full mt-2 text-sm text-gray-500 dark:text-gray-400 whitespace-normal">
                  Are you sure you want to delete this user? This action cannot
                  be undone, and all user data will be permanently removed.
                </p>
              </div>

              <div className="mt-5 sm:flex sm:items-center sm:justify-end">
                <div className="sm:flex sm:items-center">
                  <button
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    onClick={handleClick}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default DeleteAthleteModal;
