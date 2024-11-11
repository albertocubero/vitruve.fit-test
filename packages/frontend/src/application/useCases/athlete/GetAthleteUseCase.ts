import { IAthlete } from '../../../domain/types/IAthlete';
import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export class GetAthleteUseCase {
  private static instance: GetAthleteUseCase;

  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athleteId: string): Promise<IAthlete> {
    if (!athleteId) {
      throw new Error('Athlete ID must be provided');
    }
    return await this.athleteRepository.getAthleteById(athleteId);
  }

  static create(): GetAthleteUseCase {
    if (!GetAthleteUseCase.instance) {
      GetAthleteUseCase.instance = new GetAthleteUseCase(AthleteRepository.create());
    }

    return GetAthleteUseCase.instance;
  }
}

export const getAthleteUseCase = GetAthleteUseCase.create();
