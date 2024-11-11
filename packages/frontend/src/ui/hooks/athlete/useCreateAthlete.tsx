import { useAthleteMutation } from '../useAthleteMutation';
import { IAthleteFormValues } from '../../types/IAthleteFormValues';
import { createAthleteUseCase } from '../../../application/useCases/athlete/CreateAthleteUseCase';
import { IAthlete } from '../../../domain/types/IAthlete';

export const useCreateAthlete = () => {
  const mutation = useAthleteMutation<IAthlete, IAthleteFormValues>({
    mutationFn: async (data) => {
      const athlete: IAthlete = {
        name: data.name,
        age: data.age,
        team: data.team,
      };
      return await createAthleteUseCase.execute(athlete);
    },
    invalidateQueries: ['athletes'],
  });

  const createAthlete = (data: IAthleteFormValues) => {
    mutation.mutate(data);
  };

  return { createAthlete, ...mutation };
};
