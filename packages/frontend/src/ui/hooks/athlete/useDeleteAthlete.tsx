import { deleteAthleteUseCase } from '../../../application/useCases/athlete/DeleteAthleteUseCase';
import { useAthleteMutation } from '../useAthleteMutation';

export const useDeleteAthlete = () => {
  const mutation = useAthleteMutation<void, string>({
    mutationFn: async (athleteId: string) => {
      return await deleteAthleteUseCase.execute(athleteId);
    },
    invalidateQueries: ['athletes'],
  });

  const deleteAthlete = (athleteId: string) => {
    mutation.mutate(athleteId);
  };

  return { deleteAthlete, ...mutation };
};
