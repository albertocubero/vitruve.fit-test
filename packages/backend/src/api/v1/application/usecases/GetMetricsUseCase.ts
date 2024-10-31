import { Metric } from "../../domain/entities/Metric";
import { IMetricRepository } from "../../domain/interfaces/IMetricRepository";

export class GetMetricsUseCase {
  constructor(private metricRepository: IMetricRepository) {}

  async execute(athleteId: string): Promise<Metric[]> {
    return this.metricRepository.findByAthleteId(athleteId);
  }
}
