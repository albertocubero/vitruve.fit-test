import { IAthleteRepository } from '../../../infrastructure/interfaces/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export interface IDeleteAthleteUseCase {
    execute(athleteId: string): Promise<void>;
}

export class DeleteAthleteUseCase implements IDeleteAthleteUseCase {
  private static instance: IDeleteAthleteUseCase;
  
  public constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athleteId: string): Promise<void> {
    await this.athleteRepository.delete(athleteId);
  }

  static create(): IDeleteAthleteUseCase {
    if (!DeleteAthleteUseCase.instance) {
      DeleteAthleteUseCase.instance = new DeleteAthleteUseCase(AthleteRepository.create());
    }
    
    return DeleteAthleteUseCase.instance;
  }
}

export const deleteAthleteUseCase = DeleteAthleteUseCase.create();