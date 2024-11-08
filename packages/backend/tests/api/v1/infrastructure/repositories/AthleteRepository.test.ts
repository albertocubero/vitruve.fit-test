import { PrismaClient } from '@prisma/client';
import { AthleteRepository } from '../../../../../src/api/v1/infrastructure/repositories/AthleteRepository';
import { IMetricRepository } from '../../../../../src/api/v1/infrastructure/interfaces/IMetricRepository';
import { MetricRepository } from '../../../../../src/api/v1/infrastructure/repositories/MetricRepository';
import { IAthlete } from '../../../../../src/api/v1/domain/entities/Athlete';
import { IAthleteRepository } from '../../../../../src/api/v1/infrastructure/interfaces/IAthleteRepository';
import { prismaBaseServiceFactory } from '../../../../../src/api/v1/infrastructure/repositories/PrismaDbConnector';

jest.mock('@prisma/client', () => {
  const PrismaClientMock = jest.fn().mockImplementation(() => ({
    athlete: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }));

  return { PrismaClient: PrismaClientMock };
});

jest.mock(
  '../../../../../src/api/v1/infrastructure/repositories/MetricRepository',
  () => ({
    MetricRepository: {
      create: jest.fn().mockResolvedValue({}),
    },
  })
);

jest.mock(
  '../../../../../src/api/v1/infrastructure/repositories/PrismaDbConnector',
  () => {
    let prismaClientInstance: PrismaClient;

    return {
      prismaBaseServiceFactory: {
        getInstance: jest.fn().mockImplementation(() => {
          if (!prismaClientInstance) {
            prismaClientInstance = new PrismaClient();
            (prismaClientInstance.athlete.create as jest.Mock).mockReset();
            (prismaClientInstance.athlete.findMany as jest.Mock).mockReset();
            (prismaClientInstance.athlete.findUnique as jest.Mock).mockReset();
            (prismaClientInstance.athlete.update as jest.Mock).mockReset();
            (prismaClientInstance.athlete.delete as jest.Mock).mockReset();
          }
          return prismaClientInstance;
        }),
      },
    };
  }
);

describe('AthleteRepository', () => {
  let athleteRepository: IAthleteRepository;
  let metricRepositoryMock: IMetricRepository;

  beforeEach(() => {
    metricRepositoryMock = MetricRepository.create();
    athleteRepository = new AthleteRepository(metricRepositoryMock);
    metricRepositoryMock.deleteMetricsByAthleteId = jest.fn();
  });

  it('should create a new athlete', async () => {
    const athlete: IAthlete = { name: 'John Doe', age: 25, team: 'Team A' };
    const athleteCreated: IAthlete = { id: '1', ...athlete };
    (prismaBaseServiceFactory.getInstance().athlete.create as jest.Mock).mockResolvedValue(athleteCreated);

    const result = await athleteRepository.create(athlete);

    expect(result).toEqual(athleteCreated);
    expect(
      prismaBaseServiceFactory.getInstance().athlete.create
    ).toHaveBeenCalledWith({
      data: athlete,
    });
  });

  it('should find all athletes', async () => {
    const athletes = [
      { id: '1', name: 'John Doe', age: 25, team: 'Team A' },
      { id: '2', name: 'Jane Smith', age: 28, team: 'Team B' },
    ];
    (prismaBaseServiceFactory.getInstance().athlete.findMany as jest.Mock).mockResolvedValue(athletes);

    const result = await athleteRepository.findAll();

    expect(result).toEqual(athletes);
  });

  it('should find an athlete by ID', async () => {
    const athlete = { id: '1', name: 'John Doe', age: 25, team: 'Team A' };
    (prismaBaseServiceFactory.getInstance().athlete.findUnique as jest.Mock).mockResolvedValue(athlete);

    const result = await athleteRepository.findById('1');

    expect(result).toEqual(athlete);
  });

  it('should return null if athlete is not found by ID', async () => {
    (prismaBaseServiceFactory.getInstance().athlete.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await athleteRepository.findById('non-existent-id');

    expect(result).toBeNull();
  });

  it('should update an athlete', async () => {
    const athlete = { id: '1', name: 'John Doe', age: 25, team: 'Team A' };
    const dataToBeUpdated = { team: 'Team B' };
    const updatedAthlete = {
      ...athlete,
      ...dataToBeUpdated,
    };
    (prismaBaseServiceFactory.getInstance().athlete.update as jest.Mock).mockResolvedValue(updatedAthlete);

    const result = await athleteRepository.update(athlete.id, dataToBeUpdated);

    expect(result).toEqual(updatedAthlete);
  });

  it('should delete an athlete and their metrics', async () => {
    const athleteId = 'athlete-id-123';
    (prismaBaseServiceFactory.getInstance().athlete.delete as jest.Mock).mockResolvedValue({});

    await athleteRepository.delete(athleteId);

    expect(prismaBaseServiceFactory.getInstance().athlete.delete).toHaveBeenCalledWith({
      where: { id: athleteId },
    });
    expect(metricRepositoryMock.deleteMetricsByAthleteId).toHaveBeenCalledWith(
        athleteId
    );
  });

  it('should check if an athlete exists', async () => {
    const athleteId = 'athlete-id-123';
    (prismaBaseServiceFactory.getInstance().athlete.findUnique as jest.Mock).mockResolvedValue({id: athleteId});

    const result = await athleteRepository.exists(athleteId);

    expect(result).toBe(true);
  });

  it('should return false if an athlete does not exist', async () => {
    (prismaBaseServiceFactory.getInstance().athlete.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await athleteRepository.exists('non-existent-id');

    expect(result).toBe(false);
  });

  it('should use singleton for the AthleteRepository instance', () => {
    const instance1 = AthleteRepository.create();
    const instance2 = AthleteRepository.create();

    expect(instance1).toStrictEqual(instance2);
  });
});
