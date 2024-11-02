import React from 'react';
import AthleteInfo from './AthleteInfo';
import AthleteMetrics from './AthleteMetrics';
import LoadingErrorMessage from '../LoadingErrorMessage';
import { useGetAthlete } from '../../hooks/athlete/useGetAthlete';

interface AthleteDetailProps {
  athleteId: string
}

const AthleteDetail: React.FC<AthleteDetailProps> = React.memo(({ athleteId }) => {
  const { data: athlete, error: athleteError, isLoading: isAthleteLoading } = useGetAthlete(athleteId);
  
  return (
    <div>
      <LoadingErrorMessage isLoading={isAthleteLoading} error={athleteError?.message} />
      {athlete && <AthleteInfo athlete={athlete} />}
      {athlete && <AthleteMetrics athleteId={athlete.id!} />}
    </div>
  );
});

export default AthleteDetail;
