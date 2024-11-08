import { IAthlete } from '../../../domain/entities/Athlete';
import { IAthleteRepository } from '../../../infrastructure/interfaces/IAthleteRepository';
import { AthleteRepository } from '../../../infrastructure/repositories/AthleteRepository';

export interface IGetAllAthletesUseCase {
  execute(): Promise<IAthlete[]>;
}

export class GetAllAthletesUseCase implements IGetAllAthletesUseCase{
  private static instance: IGetAllAthletesUseCase;

  public constructor(private athleteRepository: IAthleteRepository) {}

  async execute(): Promise<IAthlete[]> {
    return this.athleteRepository.findAll();
  }

  static create (): IGetAllAthletesUseCase {
    if (!GetAllAthletesUseCase.instance) {
      GetAllAthletesUseCase.instance = new GetAllAthletesUseCase(AthleteRepository.create())
    }

    return GetAllAthletesUseCase.instance;
  }
}

export const getAllAthletesUseCase = GetAllAthletesUseCase.create();