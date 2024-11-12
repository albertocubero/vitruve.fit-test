jest.mock('../../../../../../src/api/v1/infrastructure/repositories/cache/redisClient');

import {createMetricCache, IMetricCache } from '../../../../../../src/api/v1/infrastructure/repositories/cache/metricCache';
import { IMetric } from '../../../../../../src/api/v1/domain/entities/Metric';

describe('MetricCache', () => {
  let mockRedis: { get: jest.Mock; set: jest.Mock; del: jest.Mock };
  let metricCache: IMetricCache;
  let createRedisClient;

  const mockMetric: IMetric = {
    id: 'metric1',
    value: 100,
    athleteId: 'athlete1',
    metricType: 'Speed',
    unit: 'km/h',
    timestamp: new Date(),
  };
  const mockMetrics: IMetric[] = [mockMetric];
  const athleteId = 'athlete1';

  beforeEach(() => {
    mockRedis = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };
    createRedisClient = () => mockRedis;
    metricCache = createMetricCache(createRedisClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMetrics', () => {
    it('should return cached metrics when they exist', async () => {
      const cacheValue = JSON.stringify(mockMetrics);
      mockRedis.get.mockResolvedValueOnce(cacheValue);
    
      const metrics = await metricCache.getMetrics(athleteId);
    
      const metricsWithoutTimestamp = metrics?.map(({ timestamp, ...rest }) => rest);
      const mockMetricsWithoutTimestamp = mockMetrics.map(({ timestamp, ...rest }) => rest);
    
      expect(mockRedis.get).toHaveBeenCalledWith(`metrics:${athleteId}`);
      expect(metricsWithoutTimestamp).toEqual(mockMetricsWithoutTimestamp);
    });

    it('should return null when no metrics are cached', async () => {
      mockRedis.get.mockResolvedValueOnce(null);

      const metrics = await metricCache.getMetrics(athleteId);

      expect(mockRedis.get).toHaveBeenCalledWith(`metrics:${athleteId}`);
      expect(metrics).toBeNull();
    });
  });

  describe('setMetric', () => {
    it('should add a new metric to the cache for an athlete', async () => {
      mockRedis.get.mockResolvedValueOnce(JSON.stringify([]));

      await metricCache.setMetric(athleteId, mockMetric);

      expect(mockRedis.get).toHaveBeenCalledWith(`metrics:${athleteId}`);
      expect(mockRedis.set).toHaveBeenCalledWith(
        `metrics:${athleteId}`,
        JSON.stringify([mockMetric]),
        'EX',
        3600
      );
    });

    it('should append the new metric to existing cached metrics', async () => {
      mockRedis.get.mockResolvedValueOnce(JSON.stringify(mockMetrics));

      const newMetric = { ...mockMetric, id: 'metric2' };
      await metricCache.setMetric(athleteId, newMetric);

      expect(mockRedis.get).toHaveBeenCalledWith(`metrics:${athleteId}`);
      expect(mockRedis.set).toHaveBeenCalledWith(
        `metrics:${athleteId}`,
        JSON.stringify([...mockMetrics, newMetric]),
        'EX',
        3600
      );
    });
  });

  describe('setMetrics', () => {
    it('should add multiple metrics to the cache for an athlete', async () => {
      mockRedis.get.mockResolvedValueOnce(JSON.stringify([]));

      await metricCache.setMetrics(athleteId, mockMetrics);

      expect(mockRedis.get).toHaveBeenCalledWith(`metrics:${athleteId}`);
      expect(mockRedis.set).toHaveBeenCalledWith(
        `metrics:${athleteId}`,
        JSON.stringify(mockMetrics),
        'EX',
        3600
      );
    });

    it('should append multiple metrics to existing cached metrics', async () => {
      const existingMetrics = [{ ...mockMetric, id: 'metric2' }];
      mockRedis.get.mockResolvedValueOnce(JSON.stringify(existingMetrics));

      await metricCache.setMetrics(athleteId, mockMetrics);

      expect(mockRedis.get).toHaveBeenCalledWith(`metrics:${athleteId}`);
      expect(mockRedis.set).toHaveBeenCalledWith(
        `metrics:${athleteId}`,
        JSON.stringify([...existingMetrics, ...mockMetrics]),
        'EX',
        3600
      );
    });
  });

  describe('deleteMetrics', () => {
    it('should delete cached metrics for the specified athlete', async () => {
      await metricCache.deleteMetrics(athleteId);

      expect(mockRedis.del).toHaveBeenCalledWith(`metrics:${athleteId}`);
    });
  });
});
