import { athleteService } from '../../services/athleteService';
import { useAthleteMutation } from '../useAthleteMutation';
import { Athlete } from '../../types/Athlete';
import { AthleteFormValues } from '../../types/AthleteFormValues';

export const useCreateAthlete = () => {
  const mutation = useAthleteMutation<Athlete, AthleteFormValues>({
    mutationFn: athleteService.saveAthlete,
    invalidateQueries: ['athletes'],
  });

  const createAthlete = (data: AthleteFormValues) => {
    mutation.mutate(data);
  };

  return { createAthlete, ...mutation };
};
