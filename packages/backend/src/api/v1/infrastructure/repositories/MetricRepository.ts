import { PrismaClient } from '@prisma/client';
import { Metric } from '../../domain/entities/Metric';
import { IMetricRepository } from '../../domain/interfaces/IMetricRepository';

const prisma = new PrismaClient();

export class MetricRepository implements IMetricRepository {
  private static instance: IMetricRepository

  async create(metric: Metric): Promise<Metric> {
    const createdMetric = await prisma.metric.create({
      data: {
        athleteId: metric.athleteId,
        metricType: metric.metricType,
        value: metric.value,
        unit: metric.unit,
        timestamp: metric.timestamp,
      },
    });
    return Metric.create(
      createdMetric.id,
      createdMetric.athleteId,
      createdMetric.metricType,
      createdMetric.value,
      createdMetric.unit,
      createdMetric.timestamp
    );
  }

  async findByAthleteId(athleteId: string): Promise<Metric[]> {
    const metrics = await prisma.metric.findMany({
      where: { athleteId },
    });
    return metrics.map(
      (m) =>
        Metric.create(
          m.id,
          m.athleteId,
          m.metricType,
          m.value,
          m.unit,
          m.timestamp
        )
    );
  }

  async deleteMetricsByAthleteId(athleteId: string): Promise<void> {
    await prisma.metric.deleteMany({
      where: { athleteId },
    });
  }

  static create(): IMetricRepository {
    if (!MetricRepository.instance) {
      MetricRepository.instance = new MetricRepository();
    }
    return MetricRepository.instance;
  }
}
