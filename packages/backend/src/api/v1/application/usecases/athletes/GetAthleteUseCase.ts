import { IAthlete } from "../../../domain/entities/Athlete";
import { IAthleteRepository } from "../../../infrastructure/interfaces/IAthleteRepository";
import { AthleteRepository } from "../../../infrastructure/repositories/AthleteRepository";

export interface IGetAthleteUseCase {
  execute(id: string): Promise<IAthlete | null>;
}

export class GetAthleteUseCase implements IGetAthleteUseCase{
  private static instance: IGetAthleteUseCase;

  public constructor(private athleteRepository: IAthleteRepository) {}

  async execute(id: string): Promise<IAthlete | null> {
    return this.athleteRepository.findById(id);
  }

  static create(): IGetAthleteUseCase {
    if (!GetAthleteUseCase.instance) {
      GetAthleteUseCase.instance = new GetAthleteUseCase(AthleteRepository.create());
    }
    return GetAthleteUseCase.instance;
  }
}

export const getAthleteUseCase = GetAthleteUseCase.create();