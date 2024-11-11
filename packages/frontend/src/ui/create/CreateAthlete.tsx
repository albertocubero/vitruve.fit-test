import React, { useCallback, useEffect, useState } from 'react';
import { IAthleteFormValues } from '../types/IAthleteFormValues';
import { useCreateAthlete } from '../hooks/athlete/useCreateAthlete';
import AthleteForm from '../form/AthleteForm';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';
import CreatePageHeader from './CreatePageHeader';

const CreateAthlete: React.FC = () => {
  const {
    createAthlete,
    isSuccess,
    isError: isCreatedAthleteError,
  } = useCreateAthlete();

  const [isCreatedSuccessful, setIsCreatedSuccessful] = useState(false);

  const onSubmit = useCallback(
    (data: IAthleteFormValues) => {
      createAthlete(data);
    },
    [createAthlete]
  );

  useEffect(() => {
    if (isSuccess) {
      setIsCreatedSuccessful(true);
    }
  }, [isSuccess]);

  return (
    <>
      <CreatePageHeader />
      <AthleteForm onSubmit={onSubmit} resetOnPerform={true} />
      {isCreatedSuccessful && (
        <SuccessMessage message="The user was created!" />
      )}
      {isCreatedAthleteError && (
        <ErrorMessage message="Failed to create athlete. Please check the input data and try again." />
      )}
    </>
  );
};

export default React.memo(CreateAthlete);
