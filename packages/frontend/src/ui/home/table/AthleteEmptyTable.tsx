import React from 'react';
import CreateAthleteButton from './CreateAthleteButton';
import MagnifyingGlassIcon from '../../common/icons/MagnifyingGlassIcon';

const AthleteEmptyTable: React.FC = () => {
  return (
    <div className="flex items-center mt-6 text-center border rounded-lg h-96 dark:border-gray-700 bg-white">
      <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
        <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
          <MagnifyingGlassIcon />
        </div>
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
          No users found
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Please try again or create add a new user.
        </p>
        <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
          <CreateAthleteButton />
        </div>
      </div>
    </div>
  );
};

export default React.memo(AthleteEmptyTable);
