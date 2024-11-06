import React from 'react';
import AthleteInfo from './AthleteInfo';
import AthleteMetrics from './AthleteMetrics';
import { useGetAthlete } from '../hooks/athlete/useGetAthlete';
import DetailPageHeader from './DetailPageHeader';
import ErrorMessage from '../common/ErrorMessage';
import Loading from '../common/Loading';

interface AthleteDetailProps {
  athleteId: string;
}

const AthleteDetail: React.FC<AthleteDetailProps> = React.memo(
  ({ athleteId }) => {
    const {
      data: athlete,
      error: athleteError,
      isLoading: isAthleteLoading,
    } = useGetAthlete(athleteId);

    return (
      <>
        <DetailPageHeader />
        {isAthleteLoading && <Loading />}
        {athlete && <AthleteInfo athlete={athlete} />}
        {athlete && <AthleteMetrics athleteId={athlete.id!} />}
        {athleteError && <ErrorMessage message={athleteError?.message} />}  
      </>
    );
  }
);

export default AthleteDetail;
