import { useQuery } from 'react-query';
import { athleteService } from '../../services/athleteService';
import { Athlete } from '../../types/Athlete';

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
};

export const useGetAthletes = () => {
  return useQuery<Athlete[], Error>(
    'athletes',
    athleteService.getAthletes,
    queryOptions
  );
};
