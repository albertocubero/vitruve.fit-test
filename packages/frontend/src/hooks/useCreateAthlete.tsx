import { useMutation, useQueryClient } from 'react-query';
import { athleteService } from '../services/athleteService';
import { AthleteFormValues } from '../components/form/AthleteForm';

const useCreateAthlete = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(athleteService.saveAthlete, {
    onSuccess: () => {
      queryClient.invalidateQueries('athletes');
    },
  });

  const createAthlete = (data: AthleteFormValues) => {
    mutation.mutate(data);
  };

  return { createAthlete };
};

export default useCreateAthlete;
