import { IAthlete } from '../../../domain/types/IAthlete';
import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';

export class GetAthletesUseCase {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(): Promise<IAthlete[]> {
    return await this.athleteRepository.getAllAthletes();
  }
}
