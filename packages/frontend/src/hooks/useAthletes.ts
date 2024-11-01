import { useQuery } from 'react-query';
import { athleteService } from '../services/athleteService';
import { Athlete } from '../types/Athlete';

export const useAthletes = () => {
  return useQuery<Athlete[], Error>('athletes', athleteService.getAthletes);
};
