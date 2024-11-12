import React from 'react';
import AthleteTable from './table/AthleteTable';
import { useGetAthletes } from '../hooks/athlete/useGetAthletes';
import AthleteEmptyTable from './table/AthleteEmptyTable';
import ErrorMessage from '../common/ErrorMessage';
import Loading from '../common/Loading';
import HomePageHeader from './HomePageHeader';

const AthleteList: React.FC = React.memo(() => {
  const {
    data: athletes,
    error: athletesError,
    isLoading: isAthletesLoading,
  } = useGetAthletes();

  return (
    <>
      <HomePageHeader athletes={athletes} />
      {isAthletesLoading && <Loading />}
      {athletes && athletes.length > 0 && <AthleteTable athletes={athletes} />}
      {athletes && athletes.length === 0 && <AthleteEmptyTable />}
      {athletesError && <ErrorMessage message={athletesError?.message} />}
    </>
  );
});

export { AthleteList };
