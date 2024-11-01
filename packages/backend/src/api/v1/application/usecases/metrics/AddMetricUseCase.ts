import { IMetric } from '../../../domain/entities/Metric';
import { IMetricRepository } from '../../../infrastructure/interfaces/IMetricRepository';
import { MetricRepository } from '../../../infrastructure/repositories/MetricRepository';

export interface IAddMetricUseCase {
  execute(data: IMetric): Promise<IMetric>;
}

export class AddMetricUseCase implements IAddMetricUseCase{
  private static instance: IAddMetricUseCase;

  private constructor(private metricRepository: IMetricRepository) {}

  async execute(metric: IMetric): Promise<IMetric> {
    return this.metricRepository.create(metric);
  }

  static create(): IAddMetricUseCase {
    if (!AddMetricUseCase.instance) {
      AddMetricUseCase.instance = new AddMetricUseCase(MetricRepository.create());
    }
    return AddMetricUseCase.instance;
  }
}
