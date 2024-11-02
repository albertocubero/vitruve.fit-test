import React from 'react';
import { useGetAthletes } from '../../hooks/athlete/useGetAthletes';
import LoadingErrorMessage from '../LoadingErrorMessage';
import AthleteTable from './table/AthleteTable';

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
      {athletes && <AthleteTable athletes={athletes} />}{' '}
    </>
  );
};

export { AthleteList };
