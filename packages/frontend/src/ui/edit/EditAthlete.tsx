import React, { useCallback, useState, useEffect } from 'react';
import { IAthlete } from '../../domain/types/IAthlete';
import AthleteForm from '../../ui/form/AthleteForm';
import { useUpdateAthlete } from '../hooks/athlete/useUpdateAthlete';
import { useGetAthlete } from '../../ui/hooks/athlete/useGetAthlete';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import SuccessMessage from '../common/SuccessMessage';
import EditPageHeader from './EditPageHeader';
import MetricsSection from './sections/MetricsSection';

interface EditAthleteProps {
  athleteId: string;
}

const EditAthlete: React.FC<EditAthleteProps> = ({ athleteId }) => {
  const {
    data: athlete,
    error: athleteError,
    isLoading: isAthleteLoading,
  } = useGetAthlete(athleteId);

  const {
    editAthlete,
    isSuccess,
    isError: isUpdateAthleteError,
  } = useUpdateAthlete(athleteId);

  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

  const onSubmit = useCallback(
    (data: IAthlete) => {
      editAthlete(data);
    },
    [editAthlete]
  );

  useEffect(() => {
    if (isSuccess) {
      setIsUpdateSuccessful(true);
    }
  }, [isSuccess]);

  return (
    <>
      <EditPageHeader />
      {isAthleteLoading && <Loading />}
      {athlete && <AthleteForm athlete={athlete} onSubmit={onSubmit} />}
      {athleteError && <ErrorMessage message={athleteError?.message} />}
      {isUpdateSuccessful && <SuccessMessage message="The user was updated!" />}
      {isUpdateAthleteError && (
        <ErrorMessage message="Failed to update athlete. Please check the input data and try again." />
      )}

      <div className="py-6">
        {athlete && <MetricsSection athleteId={athleteId} />}
      </div>
    </>
  );
};

export { EditAthlete };
