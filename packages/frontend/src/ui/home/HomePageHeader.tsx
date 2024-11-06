import React from 'react';
import CreateAthleteButton from './table/CreateAthleteButton';
import { AthleteCount } from './table/AthleteCount';
import { IAthlete } from '../../domain/types/IAthlete';

interface HomePageHeaderProps {
  athletes: IAthlete[] | undefined;
}

const HomePageHeader: React.FC<HomePageHeaderProps> = ({ athletes }) => {
  return (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-100">Users</h2>
          <AthleteCount athletes={athletes} />
        </div>

        <div className="flex items-center gap-x-3">
          <CreateAthleteButton />
        </div>
      </div>
  );
};

export default HomePageHeader;
