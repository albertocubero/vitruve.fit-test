import { IAthlete } from './IAthlete';

export interface IAthleteRepository {
    getAllAthletes(): Promise<IAthlete[]>;
    getAthleteById(id: string): Promise<IAthlete>;
    saveAthlete(athlete: IAthlete): Promise<IAthlete>;
    deleteAthlete(id: string): Promise<void>;
}
