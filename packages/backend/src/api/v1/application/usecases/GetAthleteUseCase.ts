import { Athlete } from "../../domain/entities/Athlete";
import { IAthleteRepository } from "../../domain/interfaces/IAthleteRepository";

export class GetAthleteUseCase {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(id: string): Promise<Athlete | null> {
    return this.athleteRepository.findById(id);
  }
}
