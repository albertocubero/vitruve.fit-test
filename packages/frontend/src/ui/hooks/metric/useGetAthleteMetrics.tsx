import { useQuery } from 'react-query';
import { IMetric } from '../../../domain/types/IMetric';
import { getMetricsFromAthleteUseCase } from '../../../application/useCases/metric/GetMetricsFromAthleteUseCase';

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
};

export const useGetAthleteMetrics = (athleteId: string) => {
  return useQuery<IMetric[], Error>(
    ['athleteMetrics', athleteId],
    () => getMetricsFromAthleteUseCase.execute(athleteId),
    { enabled: !!athleteId, ...queryOptions }
  );
};
