import { Metric } from '../../domain/entities/Metric';
import { IMetricRepository } from '../../domain/interfaces/IMetricRepository';

interface AddMetricDTO {
  athleteId: string;
  metricType: string;
  value: number;
  unit: string;
}

export class AddMetricUseCase {
  constructor(private metricRepository: IMetricRepository) {}

  async execute(data: AddMetricDTO): Promise<Metric> {
    const metric = new Metric(
      Date.now().toString(),
      data.athleteId,
      data.metricType,
      data.value,
      data.unit,
      new Date()
    );
    return this.metricRepository.create(metric);
  }
}
