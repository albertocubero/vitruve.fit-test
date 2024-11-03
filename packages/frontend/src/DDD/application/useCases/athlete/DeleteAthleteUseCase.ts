import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';

export class DeleteAthleteUseCase {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athleteId: string): Promise<void> {
    if (!athleteId) {
      throw new Error('Athlete ID must be provided for deletion');
    }
    await this.athleteRepository.deleteAthlete(athleteId);
  }
}
