import { IAthlete } from "../../../domain/entities/Athlete";
import { IAthleteRepository } from "../../../infrastructure/interfaces/IAthleteRepository";
import { AthleteRepository } from "../../../infrastructure/repositories/AthleteRepository";

export interface IUpdateAthleteUseCase {
  execute(id: string, data: Partial<IAthlete>): Promise<IAthlete>;
}

export class UpdateAthleteUseCase implements IUpdateAthleteUseCase{
  private static instance: IUpdateAthleteUseCase;

  public constructor(private athleteRepository: IAthleteRepository) {}

  async execute(id: string, data: Partial<IAthlete>): Promise<IAthlete> {
    return this.athleteRepository.update(id, data);
  }

  static create(): IUpdateAthleteUseCase {
    if (!UpdateAthleteUseCase.instance) {
      UpdateAthleteUseCase.instance = new UpdateAthleteUseCase(AthleteRepository.create());
    }
    return UpdateAthleteUseCase.instance;
  }
}

export const updateAthleteUseCase = UpdateAthleteUseCase.create();