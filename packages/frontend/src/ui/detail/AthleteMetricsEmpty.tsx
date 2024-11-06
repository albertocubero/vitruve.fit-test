import React from 'react';

const AthleteMetricsEmpty: React.FC = () => {
  return (
    <div className="flex items-center mt-6 text-center border rounded-lg h-48 dark:border-gray-700 bg-white">
      <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
        <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
          <MagnifyingGlass />
        </div>
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
          No metrics found
        </h1>
      </div>
    </div>
  );
};

const MagnifyingGlass: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};

export default AthleteMetricsEmpty;
