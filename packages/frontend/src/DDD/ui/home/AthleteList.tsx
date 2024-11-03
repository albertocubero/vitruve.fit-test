import React from 'react';

import LoadingErrorMessage from '../../ui/common/LoadingErrorMessage';
import AthleteTable from './table/AthleteTable';
import { useGetAthletes } from '../hooks/athlete/useGetAthletes';

const AthleteList: React.FC = () => {
  const {
    data: athletes,
    error: athletesError,
    isLoading: isAthletesLoading,
  } = useGetAthletes();

  return (
    <>
      <LoadingErrorMessage
        isLoading={isAthletesLoading}
        error={athletesError?.message}
      />
      {athletes && <AthleteTable athletes={athletes} />}
      {athletes && athletes.length === 0 && <p>No athletes found.</p>}
    </>
  );
};

export { AthleteList };
