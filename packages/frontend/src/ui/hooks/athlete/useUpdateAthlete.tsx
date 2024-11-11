import { useCallback } from 'react';
import { IAthlete } from '../../../domain/types/IAthlete';
import { useAthleteMutation } from '../useAthleteMutation';
import { updateAthleteUseCase } from '../../../application/useCases/athlete/UpdateAthleteUseCase';

export const useUpdateAthlete = (athleteId: string) => {
  const mutation = useAthleteMutation<IAthlete, IAthlete>({
    mutationFn: async (data: IAthlete) => {
      const athleteData: IAthlete = { ...data, id: athleteId };
      return await updateAthleteUseCase.execute(athleteData);
    },
    invalidateQueries: [['athlete', athleteId], 'athletes'],
  });

  const editAthlete = useCallback(
    (data: IAthlete) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return { editAthlete, ...mutation };
};
