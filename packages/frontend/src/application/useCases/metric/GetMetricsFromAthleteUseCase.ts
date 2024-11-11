import { IMetricRepository } from '../../../domain/types/IMetricRepository';
import { IMetric } from '../../../domain/types/IMetric';
import { MetricRepository } from '../../../infrastructure/repositories/MetricRepository';

export class GetMetricsFromAthleteUseCase {
  private static instance: GetMetricsFromAthleteUseCase;

  constructor(private metricRepository: IMetricRepository) {}

  async execute(athleteId: string): Promise<IMetric[]> {
    if (!athleteId) {
      throw new Error('Athlete ID must be provided');
    }

    return await this.metricRepository.getMetricsByAthleteId(athleteId);
  }

  static create(): GetMetricsFromAthleteUseCase {
    if (!GetMetricsFromAthleteUseCase.instance) {
      GetMetricsFromAthleteUseCase.instance = new GetMetricsFromAthleteUseCase(MetricRepository.create());
    }

    return GetMetricsFromAthleteUseCase.instance;
  }
}

export const getMetricsFromAthleteUseCase = GetMetricsFromAthleteUseCase.create();
