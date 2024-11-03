import { IMetricRepository } from '../../../domain/types/IMetricRepository';
import { IMetric } from '../../../domain/types/IMetric';

export class GetMetricsFromAthleteUseCase {
  constructor(private metricRepository: IMetricRepository) {}

  async execute(athleteId: string): Promise<IMetric[]> {
    if (!athleteId) {
      throw new Error('Athlete ID must be provided');
    }

    return await this.metricRepository.getMetricsByAthleteId(athleteId);
  }
}
