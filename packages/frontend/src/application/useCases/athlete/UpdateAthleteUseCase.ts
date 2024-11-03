import { IAthlete } from '../../../domain/types/IAthlete';
import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';

export class UpdateAthleteUseCase {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athlete: IAthlete): Promise<IAthlete> {
    if (!athlete.id) {
      throw new Error('Athlete must have an ID to be updated');
    }
    return await this.athleteRepository.saveAthlete(athlete);
  }
}
