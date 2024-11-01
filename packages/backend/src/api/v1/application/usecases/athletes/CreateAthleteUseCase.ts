import { Athlete, IAthlete } from '../../../domain/entities/Athlete';
import { IAthleteRepository } from '../../../domain/interfaces/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export interface ICreateAthleteUseCase {
  execute(data: IAthlete): Promise<Athlete>;
}

export class CreateAthleteUseCase implements ICreateAthleteUseCase{
  private static instance: ICreateAthleteUseCase;
  
  private constructor(private athleteRepository: IAthleteRepository) {}

  async execute(data: IAthlete): Promise<Athlete> {
    const athlete = Athlete.create('', data.name, data.age, data.team);
    return this.athleteRepository.create(athlete);
  }

  static create (): ICreateAthleteUseCase {
    if (!CreateAthleteUseCase.instance) {
      return new CreateAthleteUseCase(AthleteRepository.create())
    }

    return CreateAthleteUseCase.instance;
  }
}
