import { IMetric } from './IMetric';

export interface IMetricRepository {
  getMetricsByAthleteId(athleteId: string): Promise<IMetric[]>;
  addMetric(metric: IMetric): Promise<IMetric>;
}
