import { useMutation, useQueryClient } from 'react-query';
import { athleteService } from '../../services/athleteService';

export const useDeleteAthlete = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, string>(athleteService.deleteAthlete, {
    onSuccess: () => {
      queryClient.invalidateQueries('athletes');
    },
    onError: (error) => {
      console.error('Error deleting athlete:', error);
    },
  });

  return mutation;
};
