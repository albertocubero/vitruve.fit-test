import { IMetric, Metric } from "../../domain/entities/Metric";

export interface IMetricRepository {
  create(metric: IMetric): Promise<Metric>;
  findByAthleteId(athleteId: string): Promise<Metric[]>;
  deleteMetricsByAthleteId(athleteId: string): Promise<void>;
}
