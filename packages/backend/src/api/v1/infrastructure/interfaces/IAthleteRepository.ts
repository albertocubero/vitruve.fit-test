import { IAthlete } from "../../domain/entities/Athlete";

export interface IAthleteRepository {
  create(athlete: IAthlete): Promise<IAthlete>;
  findAll(): Promise<IAthlete[]>;
  findById(id: string): Promise<IAthlete | null>;
  update(id: string, athlete: Partial<IAthlete>): Promise<IAthlete>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
