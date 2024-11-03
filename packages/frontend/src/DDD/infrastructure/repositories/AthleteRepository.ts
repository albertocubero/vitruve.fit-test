import { IAthlete } from '../../domain/types/IAthlete';
import { IAthleteRepository } from '../../domain/types/IAthleteRepository';
import { athleteService } from '../services/athleteService';

export class AthleteRepository implements IAthleteRepository {
  async getAllAthletes(): Promise<IAthlete[]> {
    return await athleteService.getAthletes();
  }

  async getAthleteById(id: string): Promise<IAthlete> {
    return await athleteService.getAthlete(id);
  }

  async saveAthlete(athlete: IAthlete): Promise<IAthlete> {
    return await athleteService.saveAthlete(athlete);
  }

  async deleteAthlete(id: string): Promise<void> {
    return await athleteService.deleteAthlete(id);
  }
}
