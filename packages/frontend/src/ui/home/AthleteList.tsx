import React from 'react';
import AthleteTable from './table/AthleteTable';
import { useGetAthletes } from '../hooks/athlete/useGetAthletes';
import AthleteEmptyTable from './table/AthleteEmptyTable';
import CreateAthleteButton from './table/CreateAthleteButton';
import { AthleteCount } from './table/AthleteCount';
import ErrorMessage from '../common/ErrorMessage';
import Loading from '../common/Loading';

const AthleteList: React.FC = () => {
  const {
    data: athletes,
    error: athletesError,
    isLoading: isAthletesLoading,
  } = useGetAthletes();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-100">Users</h2>
          <AthleteCount athletes={athletes} />
        </div>

        <div className="flex items-center gap-x-3">
          <CreateAthleteButton />
        </div>
      </div>
      {isAthletesLoading && <Loading />}
      {athletes && athletes.length > 0 && <AthleteTable athletes={athletes} />}
      {athletes && athletes.length === 0 && <AthleteEmptyTable />}
      {athletesError && <ErrorMessage message={athletesError?.message} />}
    </div>
  );
};

export { AthleteList };
