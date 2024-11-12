import React from 'react';
import MagnifyingGlassIcon from '../../common/icons/MagnifyingGlassIcon';

const AthleteMetricsEmpty: React.FC = () => {
  return (
    <div className="flex items-center mt-6 text-center border rounded-lg h-48 dark:border-gray-700 bg-white">
      <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
        <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
          <MagnifyingGlassIcon />
        </div>
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
          No metrics found
        </h1>
      </div>
    </div>
  );
};

export default React.memo(AthleteMetricsEmpty);
