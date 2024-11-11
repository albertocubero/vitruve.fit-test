import { IAthlete } from '../../../domain/types/IAthlete';
import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export class GetAthletesUseCase {
  private static instance: GetAthletesUseCase;

  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(): Promise<IAthlete[]> {
    return await this.athleteRepository.getAllAthletes();
  }

  static create(): GetAthletesUseCase {
    if (!GetAthletesUseCase.instance) {
      GetAthletesUseCase.instance = new GetAthletesUseCase(AthleteRepository.create());
    }

    return GetAthletesUseCase.instance;
  }
}

export const getAthletesUseCase = GetAthletesUseCase.create();
