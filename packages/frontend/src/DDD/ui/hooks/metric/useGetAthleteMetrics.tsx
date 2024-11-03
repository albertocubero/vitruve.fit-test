import { useQuery } from 'react-query';
import { IMetric } from '../../../domain/types/IMetric';
import { MetricRepository } from '../../../infrastructure/repositories/MetricRepository';
import { GetMetricsFromAthleteUseCase } from '../../../application/useCases/metric/GetMetricsFromAthleteUseCase';

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
};

export const useGetAthleteMetrics = (athleteId: string) => {
  const metricRepository = new MetricRepository();
  const getMetricsUseCase = new GetMetricsFromAthleteUseCase(metricRepository);

  return useQuery<IMetric[], Error>(
    ['athleteMetrics', athleteId],
    () => getMetricsUseCase.execute(athleteId),
    { enabled: !!athleteId, ...queryOptions }
  );
};
