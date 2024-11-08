import { IMetric } from "../../domain/entities/Metric";

export interface IMetricRepository {
  create(metric: IMetric): Promise<IMetric>;
  findByAthleteId(athleteId: string): Promise<IMetric[]>;
  deleteMetricsByAthleteId(athleteId: string): Promise<void>;
}
