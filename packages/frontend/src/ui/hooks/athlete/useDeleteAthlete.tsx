import { DeleteAthleteUseCase } from '../../../application/useCases/athlete/DeleteAthleteUseCase';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';
import { useAthleteMutation } from '../useAthleteMutation';

export const useDeleteAthlete = () => {
  const athleteRepository = new AthleteRepository();
  const deleteAthleteUseCase = new DeleteAthleteUseCase(athleteRepository);

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
