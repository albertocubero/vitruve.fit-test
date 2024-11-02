import { useQuery } from 'react-query';
import { Metric } from '../../types/Metric';
import { athleteService } from '../../services/athleteService';

export const useGetAthleteMetrics = (athleteId: string) => {
  return useQuery<Metric[], Error>(
    ['athleteMetrics', athleteId],
    () => athleteService.getMetrics(athleteId),
    {
      enabled: !!athleteId,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    }
  );
};
