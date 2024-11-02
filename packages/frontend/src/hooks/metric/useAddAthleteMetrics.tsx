import { athleteService } from '../../services/athleteService';
import { useAthleteMutation } from '../useAthleteMutation';
import { Metric } from '../../types/Metric';

export const useAddAthleteMetrics = () => {
  const mutation = useAthleteMutation<Metric, Metric>({
    mutationFn: athleteService.addMetric,
    invalidateQueries: ['athleteMetrics'],
  });

  const addMetric = (data: Metric) => {      
    mutation.mutate(data);
  };

  return { addMetric, ...mutation };
};
