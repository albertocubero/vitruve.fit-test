import React from 'react';
import { useParams } from 'react-router-dom';
import AthleteDetail from '../components/detail/AthleteDetail';
import LoadingErrorMessage from '../components/LoadingErrorMessage';
import BackToHomeLink from '../components/BackToHomeLink';
import { useGetAthlete } from '../hooks/athlete/useGetAthlete';

const DetailPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();
  const { data: athlete, error: athleteError, isLoading: isAthleteLoading } = useGetAthlete(athleteId);

  return (
    <div>
      <BackToHomeLink />
      <h1>Athlete Details: </h1>
      <LoadingErrorMessage isLoading={isAthleteLoading} error={athleteError?.message} />
      {athlete && <AthleteDetail athlete={athlete} />}
    </div>
  );
};

export { DetailPage };
