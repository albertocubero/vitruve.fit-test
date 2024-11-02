import React from 'react';
import AthleteTable from '../components/home/AthleteTable';
import { useGetAthletes } from '../hooks/athlete/useGetAthletes';
import LoadingErrorMessage from '../components/LoadingErrorMessage';
import AddNewAthleteLink from '../components/home/buttons/AddNewAthleteLink';

const HomePage: React.FC = () => {
  const { data: athletes, error: athletesError, isLoading: isAthletesLoading } = useGetAthletes();
  
  return (
    <div>
      <h1>Athletes</h1>
      <AddNewAthleteLink />
      <LoadingErrorMessage isLoading={isAthletesLoading} error={athletesError?.message} />
      {athletes && <AthleteTable athletes={athletes} />}
    </div>
  );
};

export { HomePage };
