import { IMetricRepository } from '../../domain/types/IMetricRepository';
import { IMetric } from '../../domain/types/IMetric';

import { athleteService } from '../services/athleteService';

export class MetricRepository implements IMetricRepository {
  async getMetricsByAthleteId(athleteId: string): Promise<IMetric[]> {
    return await athleteService.getMetrics(athleteId);
  }

  async addMetric(metric: IMetric): Promise<IMetric> {
    return await athleteService.addMetric(metric);
  }
}
