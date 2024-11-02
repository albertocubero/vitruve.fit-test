import { useQuery } from 'react-query';
import { Metric } from '../types/Metric';
import { athleteService } from '../services/athleteService';

export const useAthleteMetrics = (athleteId: string) => {
  return useQuery<Metric[], Error>(
    ['athleteMetrics', athleteId],
    () => athleteService.getMetrics(athleteId)
  );
};
