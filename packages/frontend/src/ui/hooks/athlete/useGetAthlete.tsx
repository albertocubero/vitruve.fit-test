import { useQuery } from 'react-query';
import { athleteService } from '../../../infrastructure/services/athleteService';
import { IAthlete } from '../../../domain/types/IAthlete';

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
};

export const useGetAthlete = (athleteId: string) => {
  return useQuery<IAthlete, Error>(
    ['athlete', athleteId],
    () => athleteService.getAthlete(athleteId),
    { enabled: !!athleteId, ...queryOptions }
  );
};
