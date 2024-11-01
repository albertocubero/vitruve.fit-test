import { IMetric, Metric } from '../../../domain/entities/Metric';
import { IMetricRepository } from '../../../domain/interfaces/IMetricRepository';
import { MetricRepository } from '../../../infrastructure/repositories/MetricRepository';

export interface IAddMetricUseCase {
  execute(data: IMetric): Promise<Metric>;
}

export class AddMetricUseCase implements IAddMetricUseCase{
  private static instance: IAddMetricUseCase;

  private constructor(private metricRepository: IMetricRepository) {}

  async execute(data: IMetric): Promise<Metric> {
    const metric = Metric.create(
      Date.now().toString(),
      data.athleteId,
      data.metricType,
      data.value,
      data.unit,
      new Date()
    );
    return this.metricRepository.create(metric);
  }

  static create(): IAddMetricUseCase {
    if (!AddMetricUseCase.instance) {
      AddMetricUseCase.instance = new AddMetricUseCase(MetricRepository.create());
    }
    return AddMetricUseCase.instance;
  }
}
