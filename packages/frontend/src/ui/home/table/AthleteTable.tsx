import React from 'react';
import { AthleteRow } from './AthleteTableRow';
import AthleteTableHeaderRow from './AthleteTableHeaderRow';
import { IAthlete } from '../../../domain/types/IAthlete';

interface AthleteTableProps {
  athletes: IAthlete[];
}

const AthleteTable: React.FC<AthleteTableProps> = ({ athletes }) => {
  return (
    <div className="flex flex-col w-full mt-6">
      <div className="overflow-x-auto">
        <div className="w-full inline-block py-2 align-middle">
          <div className="overflow-hidden border border-2 border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="divide-y divide-gray-300 dark:divide-gray-700 flex flex-col">
              <div className="bg-gray-200 dark:bg-gray-700 flex">
                <AthleteTableHeaderRow />
              </div>
              <div className="bg-white dark:bg-gray-900">
                {athletes.map((athlete) => (
                  <AthleteRow key={athlete.id} athlete={athlete} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AthleteTable);
