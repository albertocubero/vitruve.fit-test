import { useQuery } from 'react-query';
import { getAthletesUseCase } from '../../../application/useCases/athlete/GetAthletesUseCase';
import { IAthlete } from '../../../domain/types/IAthlete';

const queryOptions = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 10,
  refetchOnWindowFocus: false,
};

export const useGetAthletes = () => {
  return useQuery<IAthlete[], Error>(
    'athletes',
    () => getAthletesUseCase.execute(),
    queryOptions
  );
};
