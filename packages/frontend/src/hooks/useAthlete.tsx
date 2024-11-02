import { useQuery } from 'react-query';
import { Athlete } from '../types/Athlete';
import { athleteService } from '../services/athleteService';

export const useAthlete = (athleteId: string) => {
  return useQuery<Athlete, Error>(
    ['athlete', athleteId],
    () => athleteService.getAthlete(athleteId),
  );
};
