import { athleteService } from '../../services/athleteService';
import { useAthleteMutation } from '../useAthleteMutation';

export const useDeleteAthlete = () => {
  const mutation = useAthleteMutation<void, string>({
    mutationFn: athleteService.deleteAthlete,
    invalidateQueriesOnSuccess: ['athletes'],
  });

  const deleteAthlete = (athleteId: string) => {
    mutation.mutate(athleteId);
  };

  return { deleteAthlete, ...mutation };
};