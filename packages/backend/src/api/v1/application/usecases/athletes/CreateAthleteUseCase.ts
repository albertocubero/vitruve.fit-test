import { IAthlete } from '../../../domain/entities/Athlete';
import { IAthleteRepository } from '../../../infrastructure/interfaces/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export interface ICreateAthleteUseCase {
  execute(data: IAthlete): Promise<IAthlete>;
}

export class CreateAthleteUseCase implements ICreateAthleteUseCase{
  private static instance: ICreateAthleteUseCase;
  
  private constructor(private athleteRepository: IAthleteRepository) {}

  async execute(athlete: IAthlete): Promise<IAthlete> {
    return this.athleteRepository.create(athlete);
  }

  static create (): ICreateAthleteUseCase {
    if (!CreateAthleteUseCase.instance) {
      return new CreateAthleteUseCase(AthleteRepository.create())
    }

    return CreateAthleteUseCase.instance;
  }
}
