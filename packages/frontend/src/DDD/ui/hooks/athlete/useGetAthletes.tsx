import { useQuery } from 'react-query';
import { GetAthletesUseCase } from '../../../application/useCases/athlete/GetAthletesUseCase';
import { IAthlete } from '../../../domain/types/IAthlete';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

const athleteRepository = new AthleteRepository();
const getAthletesUseCase = new GetAthletesUseCase(athleteRepository);

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
