
import { useMutation, useQueryClient } from 'react-query';
import { athleteService } from '../services/athleteService';

export const useDeleteAthlete = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>(athleteService.deleteAthlete, {
    onSuccess: () => {
      queryClient.invalidateQueries('athletes');
    },
  });
};
