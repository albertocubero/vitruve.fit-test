import { useQuery } from 'react-query';
import { athleteService } from '../../services/athleteService';
import { Athlete } from '../../types/Athlete';

export const useGetAthletes = () => {
  return useQuery<Athlete[], Error>(
    'athletes', 
    athleteService.getAthletes,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    }
  );
};
