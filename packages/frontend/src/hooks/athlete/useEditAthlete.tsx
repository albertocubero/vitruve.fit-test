import { useMutation, useQueryClient } from 'react-query';
import { athleteService } from '../../services/athleteService';
import { Athlete } from '../../types/Athlete';
import { useCallback } from 'react';

const useEditAthlete = (athleteId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(athleteService.saveAthlete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['athlete', athleteId]);
    },
    onError: (error) => {
      console.error('Error updating athlete:', error);
    },
  });

  const editAthlete = useCallback((data: Athlete) => {
    const athleteData: Athlete = {
      ...data,
      id: athleteId,
    };
    mutation.mutate(athleteData);
  }, [athleteId, mutation]);

  return { editAthlete, ...mutation };
};

export default useEditAthlete;
