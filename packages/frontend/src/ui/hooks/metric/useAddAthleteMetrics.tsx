import { useAthleteMutation } from '../useAthleteMutation';
import { IMetric } from '../../../domain/types/IMetric';
import { addMetricToAthleteUseCase } from '../../../application/useCases/metric/AddMetricToAthleteUseCase';

export const useAddAthleteMetrics = () => {
  const mutation = useAthleteMutation<IMetric, IMetric>({
    mutationFn: async (data: IMetric) => {
      return await addMetricToAthleteUseCase.execute(data);
    },
    invalidateQueries: ['athleteMetrics'],
  });

  const addMetric = (data: IMetric) => {
    mutation.mutate(data);
  };

  return { addMetric, ...mutation };
};
