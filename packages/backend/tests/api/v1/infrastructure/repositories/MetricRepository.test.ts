import { PrismaClient } from '@prisma/client';
import { MetricRepository } from '../../../../../src/api/v1/infrastructure/repositories/MetricRepository';
import { IMetricRepository } from '../../../../../src/api/v1/infrastructure/interfaces/IMetricRepository';
import { Metric } from '../../../../../src/api/v1/domain/entities/Metric';
import { prismaBaseServiceFactory } from '../../../../../src/api/v1/infrastructure/repositories/PrismaDbConnector';

jest.mock('@prisma/client', () => {
  const PrismaClientMock = jest.fn().mockImplementation(() => ({
    metric: {
      create: jest.fn(),
      findMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  }));

  return { PrismaClient: PrismaClientMock };
});

jest.mock(
  '../../../../../src/api/v1/infrastructure/repositories/PrismaDbConnector',
  () => {
    let prismaClientInstance: PrismaClient;

    return {
      prismaBaseServiceFactory: {
        getInstance: jest.fn().mockImplementation(() => {
          if (!prismaClientInstance) {
            prismaClientInstance = new PrismaClient();
            (prismaClientInstance.metric.create as jest.Mock).mockReset();
            (prismaClientInstance.metric.findMany as jest.Mock).mockReset();
            (prismaClientInstance.metric.deleteMany as jest.Mock).mockReset();
          }
          return prismaClientInstance;
        }),
      },
    };
  }
);

describe('MetricRepository', () => {
  let metricRepository: IMetricRepository;
  let prismaClientMock: PrismaClient;

  beforeEach(() => {
    metricRepository = MetricRepository.create();
    prismaClientMock = prismaBaseServiceFactory.getInstance();
  });

  it('should create a new metric', async () => {
    const metricData = {
      athleteId: 'athlete-id-123',
      metricType: 'Speed',
      value: 15.5,
      unit: 'm/s',
      timestamp: new Date(),
    };
    const createdMetric = {
      id: 'metric-id-123',
      ...metricData,
    };
    (prismaClientMock.metric.create as jest.Mock).mockResolvedValue(createdMetric);

    const result = await metricRepository.create(metricData);

    expect(result).toEqual(Metric.create(createdMetric));
  });

  it('should find metrics by athleteId', async () => {
    const athleteId = 'athlete-id-123';
    const metrics = [
      { id: 'metric-id-1', athleteId, metricType: 'Speed', value: 15.5, unit: 'm/s', timestamp: new Date() },
      { id: 'metric-id-2', athleteId, metricType: 'Strength', value: 80, unit: 'kg', timestamp: new Date() },
    ];
    (prismaClientMock.metric.findMany as jest.Mock).mockResolvedValue(metrics);

    const result = await metricRepository.findByAthleteId(athleteId);

    expect(result).toEqual(metrics);
  });

  it('should delete metrics by athleteId', async () => {
    const athleteId = 'athlete-id-123';
    (prismaClientMock.metric.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });

    await metricRepository.deleteMetricsByAthleteId(athleteId);

    expect(prismaClientMock.metric.deleteMany).toHaveBeenCalledWith({
      where: { athleteId },
    });
  });

  it('should use singleton for the MetricRepository instance', () => {
    const instance1 = MetricRepository.create();
    const instance2 = MetricRepository.create();

    expect(instance1).toBe(instance2);
  });
});
