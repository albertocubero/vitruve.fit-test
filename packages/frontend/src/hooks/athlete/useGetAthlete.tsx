import { useQuery } from 'react-query';
import { Athlete } from '../../types/Athlete';
import { athleteService } from '../../services/athleteService';

export const useGetAthlete = (athleteId: string) => {
  return useQuery<Athlete, Error>(
    ['athlete', athleteId],
    () => athleteService.getAthlete(athleteId),
    {
      enabled: !!athleteId,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    }
  );
};
