import { IMetricRepository } from '../../../domain/types/IMetricRepository';
import { IMetric } from '../../../domain/types/IMetric';

export class AddMetricToAthleteUseCase {
  constructor(private metricRepository: IMetricRepository) {}

  async execute(metric: IMetric): Promise<IMetric> {
    if (!metric) {
      throw new Error('Metric must be provided');
    }
    return this.metricRepository.addMetric(metric);
  }
}
