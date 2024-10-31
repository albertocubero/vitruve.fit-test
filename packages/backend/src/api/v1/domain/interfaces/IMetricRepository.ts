import { Metric } from '../entities/Metric';

export interface IMetricRepository {
  create(metric: Metric): Promise<Metric>;
  findByAthleteId(athleteId: string): Promise<Metric[]>;
  deleteMetricsByAthleteId(athleteId: string): Promise<void>;
}
