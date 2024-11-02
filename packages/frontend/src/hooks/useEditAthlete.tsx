import { useMutation, useQueryClient } from 'react-query';
import { athleteService } from '../services/athleteService';
import { Athlete } from '../types/Athlete';

const useEditAthlete = (athleteId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(athleteService.saveAthlete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['athlete', athleteId]);
    },
  });

  const editAthlete = (data: Athlete) => {
    const athleteData: Athlete = {
      ...data,
      id: athleteId,
    };
    mutation.mutate(athleteData);
  };

  return { editAthlete };
};

export default useEditAthlete;
