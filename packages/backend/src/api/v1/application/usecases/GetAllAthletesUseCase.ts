import { Athlete } from '../../domain/entities/Athlete';
import { IAthleteRepository } from '../../domain/interfaces/IAthleteRepository';

export class GetAllAthletesUseCase {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(): Promise<Athlete[]> {
    return this.athleteRepository.findAll();
  }
}
