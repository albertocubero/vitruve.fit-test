import { IMetricRepository } from '../../../domain/types/IMetricRepository';
import { IMetric } from '../../../domain/types/IMetric';
import { MetricRepository } from '../../../infrastructure/repositories/MetricRepository';

export class AddMetricToAthleteUseCase {
  private static instance: AddMetricToAthleteUseCase;

  constructor(private metricRepository: IMetricRepository) {}

  async execute(metric: IMetric): Promise<IMetric> {
    if (!metric) {
      throw new Error('Metric must be provided');
    }
    return this.metricRepository.addMetric(metric);
  }

  static create(): AddMetricToAthleteUseCase {
    if (!AddMetricToAthleteUseCase.instance) {
      AddMetricToAthleteUseCase.instance = new AddMetricToAthleteUseCase(MetricRepository.create());
    }

    return AddMetricToAthleteUseCase.instance;
  }
}

export const addMetricToAthleteUseCase = AddMetricToAthleteUseCase.create();
