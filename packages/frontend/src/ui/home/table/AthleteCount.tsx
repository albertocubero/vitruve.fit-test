import React from 'react';
import { IAthlete } from '../../../domain/types/IAthlete';

interface AthleteCountProps {
  athletes: IAthlete[] | undefined;
}

export const AthleteCount: React.FC<AthleteCountProps> = ({ athletes }) => {
  if (!athletes || athletes.length === 0) return null;

  return (
    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
      {athletes.length > 1
        ? `${athletes.length} Users`
        : `${athletes.length} User`}
    </span>
  );
};
