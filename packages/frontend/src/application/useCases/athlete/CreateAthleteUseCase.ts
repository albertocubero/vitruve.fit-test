import { IAthlete } from '../../../domain/types/IAthlete';
import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export class CreateAthleteUseCase {
  private static instance: CreateAthleteUseCase;

  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athlete: IAthlete): Promise<IAthlete> {
    if (!athlete) {
      throw new Error('Athlete must be provided for creation');
    }

    return await this.athleteRepository.saveAthlete(athlete);
  }

  static create(): CreateAthleteUseCase {
    if (!CreateAthleteUseCase.instance) {
      CreateAthleteUseCase.instance = new CreateAthleteUseCase(AthleteRepository.create());
    }

    return CreateAthleteUseCase.instance;
  }
}

export const createAthleteUseCase = CreateAthleteUseCase.create();