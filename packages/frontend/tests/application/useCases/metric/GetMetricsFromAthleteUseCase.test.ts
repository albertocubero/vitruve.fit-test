import { GetMetricsFromAthleteUseCase } from '../../../../src/application/useCases/metric/GetMetricsFromAthleteUseCase';
import { IMetricRepository } from '../../../../src/domain/types/IMetricRepository';
import { IMetric } from '../../../../src/domain/types/IMetric';

const metricRepositoryMock: jest.Mocked<IMetricRepository> = {
    addMetric: jest.fn(),
    getMetricsByAthleteId: jest.fn(),
};

describe('GetMetricsFromAthleteUseCase', () => {
    let getMetricsFromAthleteUseCase: GetMetricsFromAthleteUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        getMetricsFromAthleteUseCase = new GetMetricsFromAthleteUseCase(metricRepositoryMock);
    });

    it('should get metrics successfully', async () => {
        const athleteId = '1';
        const metrics: IMetric[] = [
            { id: '1', athleteId: '1', metricType: 'speed', value: 10, unit: 'm/s', timestamp: new Date() },
            { id: '2', athleteId: '1', metricType: 'endurance', value: 5, unit: 'km', timestamp: new Date() },
        ];
        metricRepositoryMock.getMetricsByAthleteId.mockResolvedValue(metrics);

        const result = await getMetricsFromAthleteUseCase.execute(athleteId);

        expect(result).toEqual(metrics);
        expect(metricRepositoryMock.getMetricsByAthleteId).toHaveBeenCalledWith(athleteId);
    });

    it('should throw an error if no athlete ID is provided', async () => {
        await expect(getMetricsFromAthleteUseCase.execute('')).rejects.toThrow('Athlete ID must be provided');
    });

    it('should handle errors when getting metrics', async () => {
        const athleteId = '1';
        metricRepositoryMock.getMetricsByAthleteId.mockRejectedValue(new Error('Database error'));

        await expect(getMetricsFromAthleteUseCase.execute(athleteId)).rejects.toThrow('Database error');
    });
});