import { IAthlete } from '../../../domain/types/IAthlete';
import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export class UpdateAthleteUseCase {
  private static instance: UpdateAthleteUseCase;

  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athlete: IAthlete): Promise<IAthlete> {
    if (!athlete.id) {
      throw new Error('Athlete must have an ID to be updated');
    }
    return await this.athleteRepository.saveAthlete(athlete);
  }

  static create(): UpdateAthleteUseCase {
    if (!UpdateAthleteUseCase.instance) {
      UpdateAthleteUseCase.instance = new UpdateAthleteUseCase(AthleteRepository.create());
    }

    return UpdateAthleteUseCase.instance;
  }
}

export const updateAthleteUseCase = UpdateAthleteUseCase.create();
