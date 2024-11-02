import { useQuery } from 'react-query';
import { athleteService } from '../../services/athleteService';
import { Athlete } from '../../types/Athlete';

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
};

export const useGetAthlete = (athleteId: string) => {
  return useQuery<Athlete, Error>(
    ['athlete', athleteId],
    () => athleteService.getAthlete(athleteId),
    { enabled: !!athleteId, ...queryOptions }
  );
};
