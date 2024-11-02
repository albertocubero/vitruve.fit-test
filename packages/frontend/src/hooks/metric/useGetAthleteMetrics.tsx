// hooks/useGetAthleteMetrics.ts
import { useQuery } from 'react-query';
import { athleteService } from '../../services/athleteService';
import { Metric } from '../../types/Metric';

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
};

export const useGetAthleteMetrics = (athleteId: string) => {
  return useQuery<Metric[], Error>(
    ['athleteMetrics', athleteId],
    () => athleteService.getMetrics(athleteId),
    { enabled: !!athleteId, ...queryOptions }
  );
};
