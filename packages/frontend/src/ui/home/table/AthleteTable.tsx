import React, { useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AthleteRow } from './AthleteTableRow';
import AthleteTableHeaderRow from './AthleteTableHeaderRow';
import { IAthlete } from '../../../domain/types/IAthlete';

interface AthleteTableProps extends RouteComponentProps {
  athletes: IAthlete[];
}

const AthleteTable: React.FC<AthleteTableProps> = ({ athletes, history }) => {
  const navigateToCreateUser = useCallback(() => {
    history.push('/athletes/new');
  }, [history]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-100">Users</h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {athletes.length > 1
              ? `${athletes.length} Users`
              : `${athletes.length} User`}
          </span>
        </div>

        <div className="flex items-center gap-x-3">
          <button
            className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            onClick={navigateToCreateUser}
          >
            Create User
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full mt-6">
        <div className="overflow-x-auto">
          <div className="w-full inline-block py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
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
    </div>
  );
};

export default withRouter(AthleteTable);
