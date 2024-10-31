import { Athlete } from "../../domain/entities/Athlete";
import { IAthleteRepository } from "../../domain/interfaces/IAthleteRepository";

export class UpdateAthleteUseCase {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(id: string, data: Partial<Athlete>): Promise<Athlete> {
    return this.athleteRepository.update(id, data);
  }
}
