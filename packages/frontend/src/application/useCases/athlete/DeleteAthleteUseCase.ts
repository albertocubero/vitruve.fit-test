import { IAthleteRepository } from '../../../domain/types/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export class DeleteAthleteUseCase {
  private static instance: DeleteAthleteUseCase;

  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athleteId: string): Promise<void> {
    if (!athleteId) {
      throw new Error('Athlete ID must be provided for deletion');
    }
    await this.athleteRepository.deleteAthlete(athleteId);
  }

  static create(): DeleteAthleteUseCase {
    if (!DeleteAthleteUseCase.instance) {
      DeleteAthleteUseCase.instance = new DeleteAthleteUseCase(AthleteRepository.create());
    }

    return DeleteAthleteUseCase.instance;
  }
}

export const deleteAthleteUseCase = DeleteAthleteUseCase.create();