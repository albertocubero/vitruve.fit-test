import { IAthlete } from '../../domain/types/IAthlete';
import { IAthleteRepository } from '../../domain/types/IAthleteRepository';
import { athleteService, IAthleteService } from '../services/athleteService';

export class AthleteRepository implements IAthleteRepository {
  private static instance: IAthleteRepository;

  constructor(private athleteService: IAthleteService) {}

  async getAllAthletes(): Promise<IAthlete[]> {
    return await this.athleteService.getAthletes();
  }

  async getAthleteById(id: string): Promise<IAthlete> {
    return await this.athleteService.getAthlete(id);
  }

  async saveAthlete(athlete: IAthlete): Promise<IAthlete> {
    return await this.athleteService.saveAthlete(athlete);
  }

  async deleteAthlete(id: string): Promise<void> {
    return await this.athleteService.deleteAthlete(id);
  }

  static create(): IAthleteRepository {
    if (!AthleteRepository.instance) {
      AthleteRepository.instance = new AthleteRepository(athleteService);
    }

    return AthleteRepository.instance;
  }
}

export const athleteRepository = AthleteRepository.create();
