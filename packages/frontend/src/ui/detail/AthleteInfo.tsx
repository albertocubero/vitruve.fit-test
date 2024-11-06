import React from 'react';
import { IAthlete } from '../../domain/types/IAthlete';

interface AthleteInfoProps {
  athlete: IAthlete;
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({ athlete }) => (
  <div className="w-full px-4 py-4 mt-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">Name:</h3>
        <p className="text-gray-700 dark:text-gray-200">{athlete.name}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">Age:</h3>
        <p className="text-gray-700 dark:text-gray-200">{athlete.age}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">Team:</h3>
        <p className="text-gray-700 dark:text-gray-200">{athlete.team}</p>
      </div>
    </div>
  </div>
);

export default AthleteInfo;
