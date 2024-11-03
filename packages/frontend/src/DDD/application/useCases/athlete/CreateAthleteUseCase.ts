import { IAthlete } from '../../../domain/types/IAthlete';
import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';

export class CreateAthleteUseCase {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athlete: IAthlete): Promise<IAthlete> {
    if (!athlete) {
      throw new Error('Athlete must be provided for creation');
    }

    return await this.athleteRepository.saveAthlete(athlete);
  }
}
