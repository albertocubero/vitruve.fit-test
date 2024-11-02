import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Athlete } from '../types/Athlete';
import MetricsSection from '../components/edit/MetricsSection';
import AthleteForm from '../components/form/AthleteForm';
import LoadingErrorMessage from '../components/LoadingErrorMessage';
import BackToHomeLink from '../components/BackToHomeLink';
import { useGetAthlete } from '../hooks/athlete/useGetAthlete';
import { useEditAthlete } from '../hooks/athlete/useEditAthlete';

const EditPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();
  const { data: athlete, error: athleteError, isLoading: isAthleteLoading } = useGetAthlete(athleteId);
  const { editAthlete } = useEditAthlete(athleteId);

  const onSubmit = useCallback((data: Athlete) => {
    editAthlete(data);
  }, [editAthlete]);

  return (
    <div>
      <BackToHomeLink />
      <h1>Edit Athlete</h1>
      <LoadingErrorMessage isLoading={isAthleteLoading} error={athleteError?.message} />
      {athlete && <AthleteForm athlete={athlete} onSubmit={onSubmit} />}
      {athlete && <MetricsSection athleteId={athleteId} />}
    </div>
  );
};

export { EditPage };
