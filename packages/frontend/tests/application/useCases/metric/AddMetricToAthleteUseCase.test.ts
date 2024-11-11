import { AddMetricToAthleteUseCase } from '../../../../src/application/useCases/metric/AddMetricToAthleteUseCase';
import { IMetricRepository } from '../../../../src/domain/types/IMetricRepository';
import { IMetric } from '../../../../src/domain/types/IMetric';

const metricRepositoryMock: jest.Mocked<IMetricRepository> = {
    addMetric: jest.fn(),
    getMetricsByAthleteId: jest.fn(),
};

describe('AddMetricToAthleteUseCase', () => {
    let addMetricToAthleteUseCase: AddMetricToAthleteUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        addMetricToAthleteUseCase = new AddMetricToAthleteUseCase(metricRepositoryMock);
    });

    it('should add a metric successfully', async () => {
        const metric: IMetric = {
            id: '1',
            athleteId: '1',
            metricType: 'speed',
            value: 10,
            unit: 'm/s',
            timestamp: new Date(),
        };
        metricRepositoryMock.addMetric.mockResolvedValue(metric);

        const result = await addMetricToAthleteUseCase.execute(metric);

        expect(result).toEqual(metric);
        expect(metricRepositoryMock.addMetric).toHaveBeenCalledWith(metric);
    });

    it('should throw an error if no metric is provided', async () => {
        await expect(addMetricToAthleteUseCase.execute(null as any)).rejects.toThrow('Metric must be provided');
    });

    it('should handle errors when adding a metric', async () => {
        const metric: IMetric = {
            id: '1',
            athleteId: '1',
            metricType: 'speed',
            value: 10,
            unit: 'm/s',
            timestamp: new Date(),
        };
        metricRepositoryMock.addMetric.mockRejectedValue(new Error('Database error'));

        await expect(addMetricToAthleteUseCase.execute(metric)).rejects.toThrow('Database error');
    });
});