import { IAthlete } from '../../../domain/types/IAthlete';
import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';

export class GetAthlete {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athleteId: string): Promise<IAthlete> {
    if (!athleteId) {
      throw new Error('Athlete ID must be provided');
    }
    return await this.athleteRepository.getAthleteById(athleteId);
  }
}
