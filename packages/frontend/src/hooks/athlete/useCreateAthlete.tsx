import { useMutation, useQueryClient } from 'react-query';
import { athleteService } from '../../services/athleteService';
import { AthleteFormValues } from '../../components/form/AthleteForm';
import { Athlete } from '../../types/Athlete';

const useCreateAthlete = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Athlete, Error, AthleteFormValues>(athleteService.saveAthlete, {
    onSuccess: () => {
      queryClient.invalidateQueries('athletes');
    },
    onError: (error) => {
      console.error('Error creating athlete:', error);
    },
  });

  const createAthlete = (data: AthleteFormValues) => {
    mutation.mutate(data);
  };

  return { createAthlete, ...mutation };
};

export default useCreateAthlete;
