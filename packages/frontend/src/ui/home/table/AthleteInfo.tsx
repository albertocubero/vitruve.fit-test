import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IAthlete } from '../../../domain/types/IAthlete';

interface AthleteInfoProps extends RouteComponentProps {
  athlete: IAthlete;
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({ athlete, history }) => {
  const navigateToViewUser = useCallback(() => {
    history.push(`/athletes/${athlete.id}`);
  }, [history, athlete]);
  
  return (
    <>
      <div className="flex items-center px-4 py-4 text-sm font-medium max-w-xs w-1/4">
        <button
          className="font-bold text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none truncate"
          onClick={navigateToViewUser}
        >
          {athlete.name}
        </button>
      </div>
      <div className="flex items-center px-4 py-4 text-sm font-medium w-1/4">
        <div className="font-medium text-gray-500 whitespace-nowrap dark:text-white truncate">
          {athlete.age}
        </div>
      </div>
      <div className="flex items-center px-4 py-4 text-sm font-medium max-w-xs w-1/4">
        <div className="font-medium text-gray-500 whitespace-nowrap dark:text-white truncate">
          {athlete.team}
        </div>
      </div>
    </>
  );
};

export default withRouter(AthleteInfo);
