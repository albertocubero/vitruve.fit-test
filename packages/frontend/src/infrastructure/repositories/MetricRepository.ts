import { IMetricRepository } from '../../domain/types/IMetricRepository';
import { IMetric } from '../../domain/types/IMetric';

import { athleteService, IAthleteService } from '../services/athleteService';

export class MetricRepository implements IMetricRepository {
  private static instance: IMetricRepository;

  constructor(private athleteService: IAthleteService) {}

  async getMetricsByAthleteId(athleteId: string): Promise<IMetric[]> {
    return await this.athleteService.getMetrics(athleteId);
  }

  async addMetric(metric: IMetric): Promise<IMetric> {
    return await this.athleteService.addMetric(metric);
  }

  static create(): IMetricRepository {
    if (!MetricRepository.instance) {
      MetricRepository.instance = new MetricRepository(athleteService);
    }

    return MetricRepository.instance;
  }
}

export const metricRepository = MetricRepository.create();