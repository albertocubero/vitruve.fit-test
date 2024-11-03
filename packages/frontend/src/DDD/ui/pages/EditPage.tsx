import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { IAthlete } from '../../domain/types/IAthlete';
import LoadingErrorMessage from '../../ui/common/LoadingErrorMessage';
import BackToHomeLink from '../../ui/common/BackToHomeLink';
import AthleteForm from '../../ui/form/AthleteForm';
import MetricsSection from '../../ui/edit/MetricsSection';
import { useUpdateAthlete } from '../hooks/athlete/useUpdateAthlete';
import { useGetAthlete } from '../../ui/hooks/athlete/useGetAthlete';

const EditPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();
  const {
    data: athlete,
    error: athleteError,
    isLoading: isAthleteLoading,
  } = useGetAthlete(athleteId);
  const { editAthlete } = useUpdateAthlete(athleteId);

  const onSubmit = useCallback(
    (data: IAthlete) => {
      editAthlete(data);
    },
    [editAthlete]
  );

  return (
    <>
      <BackToHomeLink />
      <h1>Edit Athlete</h1>
      <LoadingErrorMessage
        isLoading={isAthleteLoading}
        error={athleteError?.message}
      />
      {athlete && <AthleteForm athlete={athlete} onSubmit={onSubmit} />}
      {athlete && <MetricsSection athleteId={athleteId} />}
    </>
  );
};

export { EditPage };
