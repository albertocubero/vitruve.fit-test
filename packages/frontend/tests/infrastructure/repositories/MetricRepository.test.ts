import { MetricRepository } from '../../../src/infrastructure/repositories/MetricRepository';
import { IAthleteService } from '../../../src/infrastructure/services/athleteService';
import { IMetric } from '../../../src/domain/types/IMetric';

const athleteServiceMock: jest.Mocked<IAthleteService> = {
  getAthletes: jest.fn(),
  getAthlete: jest.fn(),
  saveAthlete: jest.fn(),
  deleteAthlete: jest.fn(),
  getMetrics: jest.fn(),
  addMetric: jest.fn(),
};

describe('MetricRepository', () => {
    let metricRepository: MetricRepository;
  
    beforeEach(() => {
      jest.clearAllMocks();
      metricRepository = new MetricRepository(athleteServiceMock);
    });
  
    it('should retrieve metrics by athlete id', async () => {
      const athleteId = '1';
      const mockMetrics: IMetric[] = [
        { id: 'm1', athleteId, metricType: 'speed', value: 10, unit: 'm/s', timestamp: new Date() },
        { id: 'm2', athleteId, metricType: 'endurance', value: 15, unit: 'km', timestamp: new Date() },
      ];
      athleteServiceMock.getMetrics.mockResolvedValue(mockMetrics);
  
      const metrics = await metricRepository.getMetricsByAthleteId(athleteId);
  
      expect(metrics).toEqual(mockMetrics);
      expect(athleteServiceMock.getMetrics).toHaveBeenCalledWith(athleteId);
    });
  
    it('should add a metric', async () => {
      const newMetric: IMetric = { 
        id: 'm3', 
        athleteId: '1', 
        metricType: 'strength', 
        value: 200, 
        unit: 'kg', 
        timestamp: new Date() 
      };
      athleteServiceMock.addMetric.mockResolvedValue(newMetric);
  
      const savedMetric = await metricRepository.addMetric(newMetric);
  
      expect(savedMetric).toEqual(newMetric);
      expect(athleteServiceMock.addMetric).toHaveBeenCalledWith(newMetric);
    });
  });