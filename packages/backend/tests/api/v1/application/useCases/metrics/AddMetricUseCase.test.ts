import {
  AddMetricUseCase,
  IAddMetricUseCase,
} from '../../../../../../src/api/v1/application/usecases/metrics/AddMetricUseCase';
import { IMetric } from '../../../../../../src/api/v1/domain/entities/Metric';
import { IMetricRepository } from '../../../../../../src/api/v1/infrastructure/interfaces/IMetricRepository';

describe('AddMetricUseCase', () => {
  let addMetricUseCase: IAddMetricUseCase;
  let metricRepositoryMock: IMetricRepository;

  const metric: IMetric = {
    athleteId: 'athlete-id-123',
    metricType: 'speed',
    value: 30,
    unit: 'km/h',
    timestamp: new Date(),
  };

  const metricCreated: IMetric = {
    id: 'metric-id-123',
    athleteId: 'athlete-id-123',
    metricType: 'speed',
    value: 30,
    unit: 'km/h',
    timestamp: new Date(),
  };

  beforeEach(() => {
    metricRepositoryMock = {
      create: jest.fn(),
    } as unknown as IMetricRepository;

    addMetricUseCase = new AddMetricUseCase(metricRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the repository create method with the correct metric data', async () => {
    metricRepositoryMock.create = jest.fn().mockResolvedValueOnce(metricCreated);

    const result = await addMetricUseCase.execute(metric);

    expect(result).toEqual(metricCreated);
  });

  it('should use singleton for the AddMetricUseCase instance', () => {
    const instance1 = AddMetricUseCase.create();
    const instance2 = AddMetricUseCase.create();

    expect(instance1).toBe(instance2);
  });
});
