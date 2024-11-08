import { IMetric } from "../../../domain/entities/Metric";
import { IMetricRepository } from "../../../infrastructure/interfaces/IMetricRepository";
import { metricRepository } from "../../../infrastructure/repositories/MetricRepository";

export interface IGetMetricsUseCase {
  execute(athleteId: string): Promise<IMetric[]>;
}

export class GetMetricsUseCase implements IGetMetricsUseCase {
  private static instance: IGetMetricsUseCase;

  public constructor(private metricRepository: IMetricRepository) {}

  async execute(athleteId: string): Promise<IMetric[]> {
    return this.metricRepository.findByAthleteId(athleteId);
  }

  static create(): IGetMetricsUseCase {
    if (!GetMetricsUseCase.instance) {
      GetMetricsUseCase.instance = new GetMetricsUseCase(metricRepository);
    }
    return GetMetricsUseCase.instance;
  }
}

export const getMetricsUseCase = GetMetricsUseCase.create();