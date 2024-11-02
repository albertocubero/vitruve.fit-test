import { useCallback } from 'react';
import { athleteService } from '../../services/athleteService';
import { Athlete } from '../../types/Athlete';
import { useAthleteMutation } from '../useAthleteMutation';

export const useEditAthlete = (athleteId: string) => {
  const mutation = useAthleteMutation<Athlete, Athlete>({
    mutationFn: athleteService.saveAthlete,
    invalidateQueries: [['athlete', athleteId], 'athletes'],
  });

  const editAthlete = useCallback(
    (data: Athlete) => {
      const athleteData: Athlete = { ...data, id: athleteId };
      mutation.mutate(athleteData);
    },
    [athleteId, mutation]
  );

  return { editAthlete, ...mutation };
};
