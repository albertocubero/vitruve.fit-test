import { useAthleteMutation } from '../useAthleteMutation';
import { IMetric } from '../../../domain/types/IMetric';
import { AddMetricToAthleteUseCase } from '../../../application/useCases/metric/AddMetricToAthleteUseCase';
import { MetricRepository } from '../../../infrastructure/repositories/MetricRepository';

export const useAddAthleteMetrics = () => {
  const mutation = useAthleteMutation<IMetric, IMetric>({
    mutationFn: async (data: IMetric) => {
      const metricRepository = new MetricRepository();
      const createMetric = new AddMetricToAthleteUseCase(metricRepository);
      return await createMetric.execute(data);
    },
    invalidateQueries: ['athleteMetrics'],
  });

  const addMetric = (data: IMetric) => {
    mutation.mutate(data);
  };

  return { addMetric, ...mutation };
};
