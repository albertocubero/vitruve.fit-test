import { Athlete, IAthlete } from '../entities/Athlete';

export interface IAthleteRepository {
  create(athlete: Athlete): Promise<Athlete>;
  findAll(): Promise<Athlete[]>;
  findById(id: string): Promise<Athlete | null>;
  update(id: string, athlete: Partial<IAthlete>): Promise<Athlete>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
