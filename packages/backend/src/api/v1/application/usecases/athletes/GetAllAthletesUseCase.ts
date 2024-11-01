import { Athlete } from '../../../domain/entities/Athlete';
import { IAthleteRepository } from '../../../infrastructure/interfaces/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export interface IGetAllAthletesUseCase {
  execute(): Promise<Athlete[]>;
}

export class GetAllAthletesUseCase implements IGetAllAthletesUseCase{
  private static instance: IGetAllAthletesUseCase;

  private constructor(private athleteRepository: IAthleteRepository) {}

  async execute(): Promise<Athlete[]> {
    return this.athleteRepository.findAll();
  }

  static create (): IGetAllAthletesUseCase {
    if (!GetAllAthletesUseCase.instance) {
      return new GetAllAthletesUseCase(AthleteRepository.create())
    }

    return GetAllAthletesUseCase.instance;
  }
}
