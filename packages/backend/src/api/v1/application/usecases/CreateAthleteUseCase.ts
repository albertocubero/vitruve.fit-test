import { Athlete } from '../../domain/entities/Athlete';
import { IAthleteRepository } from '../../domain/interfaces/IAthleteRepository';

interface CreateAthleteDTO {
  name: string;
  age: number;
  team: string;
}

export class CreateAthleteUseCase {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute(data: CreateAthleteDTO): Promise<Athlete> {
    const athlete = new Athlete('', data.name, data.age, data.team);
    return this.athleteRepository.create(athlete);
  }
}
