import { Athlete } from "../../../domain/entities/Athlete";
import { IAthleteRepository } from "../../../domain/interfaces/IAthleteRepository";
import { AthleteRepository } from "../../../infrastructure/repositories/AthleteRepository";

export interface IGetAthleteUseCase {
  execute(id: string): Promise<Athlete | null>;
}

export class GetAthleteUseCase implements IGetAthleteUseCase{
  private static instance: IGetAthleteUseCase;

  private constructor(private athleteRepository: IAthleteRepository) {}

  async execute(id: string): Promise<Athlete | null> {
    return this.athleteRepository.findById(id);
  }

  static create(): IGetAthleteUseCase {
    if (!GetAthleteUseCase.instance) {
      GetAthleteUseCase.instance = new GetAthleteUseCase(AthleteRepository.create());
    }
    return GetAthleteUseCase.instance;
  }
}
