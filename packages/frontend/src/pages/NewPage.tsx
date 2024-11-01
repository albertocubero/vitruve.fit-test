import React from 'react';
import AthleteForm, { AthleteFormValues } from '../components/AthleteForm';
import { useMutation, useQueryClient } from 'react-query';
import { athleteService } from '../services/athleteService';

const NewPage: React.FC = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(athleteService.saveAthlete, {
    onSuccess: () => {
      queryClient.invalidateQueries('athletes');
    },
  });

  const onSubmit = (data: AthleteFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h1>New Athlete</h1>
      <AthleteForm onSubmit={onSubmit} />
    </div>
  );
};

export { NewPage };
