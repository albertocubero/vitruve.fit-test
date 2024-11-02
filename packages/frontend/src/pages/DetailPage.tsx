import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAthlete } from '../hooks/useAthlete';
import AthleteDetail from '../components/detail/AthleteDetail';
import LoadingErrorMessage from '../components/LoadingErrorMessage';

const DetailPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();

  const {
    data: athlete,
    error: athleteError,
    isLoading: isAthleteLoading,
  } = useAthlete(athleteId);

  return (
    <div>
      <Link to={`/`}>Volver</Link>
      <h1>Athlete Details: </h1>
      <LoadingErrorMessage isLoading={isAthleteLoading} error={athleteError?.message} />
      {athlete && <AthleteDetail athlete={athlete} />}
    </div>
  );
};

export { DetailPage };
