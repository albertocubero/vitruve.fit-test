import { PrismaClient, Metric as PrismaMetric } from '@prisma/client';
import { Metric, IMetric } from '../../domain/entities/Metric';
import { IMetricRepository } from '../interfaces/IMetricRepository';
import { prismaBaseServiceFactory } from './PrismaDbConnector';

export class MetricRepository implements IMetricRepository {
  private static instance: IMetricRepository;
  private prismaInstance: PrismaClient;

  private constructor() {
    this.prismaInstance = prismaBaseServiceFactory.getInstance();
  }

  async create(metric: IMetric): Promise<IMetric> {
    try {
      const createdMetric: PrismaMetric = await this.prismaInstance.metric.create({
        data: {
          athleteId: metric.athleteId,
          metricType: metric.metricType,
          value: metric.value,
          unit: metric.unit,
          timestamp: metric.timestamp || new Date(),
        },
      });
      return Metric.create({
        id: createdMetric.id,
        athleteId: createdMetric.athleteId,
        metricType: createdMetric.metricType,
        value: createdMetric.value,
        unit: createdMetric.unit,
        timestamp: createdMetric.timestamp,
      });
    } catch (error) {
      throw new Error(`[METRICS] Failed to create metric: ${error}`);
    }
  }

  async findByAthleteId(athleteId: string): Promise<IMetric[]> {
    try {
      const metrics: PrismaMetric[] = await this.prismaInstance.metric.findMany({
        where: { athleteId },
      });
      return metrics.map((m: PrismaMetric) =>
        Metric.create({
          id: m.id,
          athleteId: m.athleteId,
          metricType: m.metricType,
          value: m.value,
          unit: m.unit,
          timestamp: m.timestamp,
        })
      );
    } catch (error) {
      throw new Error(`[METRICS] Failed to find metrics for athlete ID ${athleteId}: ${error}`);
    }
  }

  async deleteMetricsByAthleteId(athleteId: string): Promise<void> {
    try {
      await this.prismaInstance.metric.deleteMany({
        where: { athleteId },
      });
    } catch (error) {
      throw new Error(`[METRICS] Failed to delete metrics for athlete ID ${athleteId}: ${error}`);
    }
  }

  static create(): IMetricRepository {
    if (!MetricRepository.instance) {
      MetricRepository.instance = new MetricRepository();
    }
    return MetricRepository.instance;
  }
}

export const metricRepository = MetricRepository.create();