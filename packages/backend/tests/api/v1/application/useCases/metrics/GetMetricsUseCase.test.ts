import { GetMetricsUseCase, IGetMetricsUseCase } from '../../../../../../src/api/v1/application/usecases/metrics/GetMetricsUseCase';
import { IMetric } from '../../../../../../src/api/v1/domain/entities/Metric';
import { IMetricRepository } from '../../../../../../src/api/v1/infrastructure/interfaces/IMetricRepository';

describe('GetMetricsUseCase', () => {
  let getMetricsUseCase: IGetMetricsUseCase;
  let metricRepositoryMock: IMetricRepository;

  const athleteId = 'athlete-id-123';
  const metrics: IMetric[] = [
    { athleteId: 'athlete-id-123', metricType: 'speed', value: 25, unit: 'km/h' },
    { athleteId: 'athlete-id-123', metricType: 'strength', value: 120, unit: 'kg' },
  ];

  beforeEach(() => {
    metricRepositoryMock = {
      findByAthleteId: jest.fn().mockImplementation((id: string) =>
        id === athleteId ? Promise.resolve(metrics) : Promise.resolve([])
      ),
    } as unknown as IMetricRepository;

    getMetricsUseCase = new GetMetricsUseCase(metricRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return metrics for the given athlete ID', async () => {
    const result = await getMetricsUseCase.execute(athleteId);

    expect(result).toEqual(metrics);
  });

  it('should return an empty array if no metrics are found for the given athlete ID', async () => {
    const result = await getMetricsUseCase.execute('athlete-id-not-exist');

    expect(result).toEqual([]);
  });

  it('should use singleton for the GetMetricsUseCase instance', () => {
    const instance1 = GetMetricsUseCase.create();
    const instance2 = GetMetricsUseCase.create();

    expect(instance1).toBe(instance2);
  });
});
