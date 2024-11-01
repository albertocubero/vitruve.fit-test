import { Athlete, IAthlete } from "../../../domain/entities/Athlete";
import { IAthleteRepository } from "../../../domain/interfaces/IAthleteRepository";
import { AthleteRepository } from "../../../infrastructure/repositories/AthleteRepository";

export interface IUpdateAthleteUseCase {
  execute(id: string, data: Partial<IAthlete>): Promise<Athlete>;
}

export class UpdateAthleteUseCase implements IUpdateAthleteUseCase{
  private static instance: IUpdateAthleteUseCase;

  private constructor(private athleteRepository: IAthleteRepository) {}

  async execute(id: string, data: Partial<IAthlete>): Promise<Athlete> {
    return this.athleteRepository.update(id, data);
  }

  static create(): IUpdateAthleteUseCase {
    if (!UpdateAthleteUseCase.instance) {
      UpdateAthleteUseCase.instance = new UpdateAthleteUseCase(AthleteRepository.create());
    }
    return UpdateAthleteUseCase.instance;
  }
}
