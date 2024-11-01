import { Metric } from "../../../domain/entities/Metric";
import { IMetricRepository } from "../../../infrastructure/interfaces/IMetricRepository";
import { MetricRepository } from "../../../infrastructure/repositories/MetricRepository";

export interface IGetMetricsUseCase {
  execute(athleteId: string): Promise<Metric[]>;
}

export class GetMetricsUseCase implements IGetMetricsUseCase {
  private static instance: IGetMetricsUseCase;

  private constructor(private metricRepository: IMetricRepository) {}

  async execute(athleteId: string): Promise<Metric[]> {
    return this.metricRepository.findByAthleteId(athleteId);
  }

  static create(): IGetMetricsUseCase {
    if (!GetMetricsUseCase.instance) {
      GetMetricsUseCase.instance = new GetMetricsUseCase(MetricRepository.create());
    }
    return GetMetricsUseCase.instance;
  }
}
