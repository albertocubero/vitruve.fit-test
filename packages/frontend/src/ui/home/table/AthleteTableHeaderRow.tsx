import React from 'react';

const AthleteTableHeaderRow: React.FC = () => (
  <>
    <div className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 w-1/4">Name</div>
    <div className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 w-1/4">Age</div>
    <div className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 w-1/4">Team</div>
    <div className="relative py-3.5 px-4 text-right w-1/4"><span className="sr-only"></span></div>
  </>
);

export default React.memo(AthleteTableHeaderRow);
