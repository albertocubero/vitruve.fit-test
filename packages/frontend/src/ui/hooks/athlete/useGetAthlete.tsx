import { useQuery } from 'react-query';
import { IAthlete } from '../../../domain/types/IAthlete';
import { getAthleteUseCase } from '../../../application/useCases/athlete/GetAthleteUseCase';

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
};

export const useGetAthlete = (athleteId: string) => {
  return useQuery<IAthlete, Error>(
    ['athlete', athleteId],
    () => getAthleteUseCase.execute(athleteId),
    { enabled: !!athleteId, ...queryOptions }
  );
};
