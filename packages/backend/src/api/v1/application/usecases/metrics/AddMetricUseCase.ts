import { IMetric } from '../../../domain/entities/Metric';
import { IMetricRepository } from '../../../infrastructure/interfaces/IMetricRepository';
import { metricRepository } from '../../../infrastructure/repositories/MetricRepository';

export interface IAddMetricUseCase {
  execute(data: IMetric): Promise<IMetric>;
}

export class AddMetricUseCase implements IAddMetricUseCase{
  private static instance: IAddMetricUseCase;

  public constructor(private metricRepository: IMetricRepository) {}

  async execute(metric: IMetric): Promise<IMetric> {
    return this.metricRepository.create(metric);
  }

  static create(): IAddMetricUseCase {
    if (!AddMetricUseCase.instance) {
      AddMetricUseCase.instance = new AddMetricUseCase(metricRepository);
    }
    return AddMetricUseCase.instance;
  }
}

export const addMetricUseCase = AddMetricUseCase.create();