import { serve } from '@hono/node-server';
import { addMetricUseCase } from '../../../../../src/api/v1/application/usecases/metrics/AddMetricUseCase';
import { getMetricsUseCase } from '../../../../../src/api/v1/application/usecases/metrics/GetMetricsUseCase';
import { app } from './testServer';
import logger from '../../../../../src/utils/logger';
import metricCacheFactory from '../../../../../src/api/v1/infrastructure/repositories/cache/metricCache'

jest.mock('../../../../../src/api/v1/application/usecases/metrics/AddMetricUseCase');
jest.mock('../../../../../src/api/v1/application/usecases/metrics/GetMetricsUseCase');
jest.mock('../../../../../src/utils/logger');

jest.mock('../../../../../src/api/v1/infrastructure/routes/validation/athleteIdValidation', () => ({
  validateAthleteId: jest.fn().mockImplementation((c, next) => next()),
}));
jest.mock('../../../../../src/api/v1/infrastructure/routes/validation/metricValidation', () => ({
  validateAddMetricParams: jest.fn().mockImplementation((c, next) => next()),
}));
jest.mock('../../../../../src/api/v1/infrastructure/repositories/cache/metricCache');

describe('metricsController', () => {
  const athleteId = '123';
  const metricData = {
    athleteId,
    metricType: 'speed',
    value: 12.5,
    unit: 'km/h',
  };

  let appServer: any;
  let mockMetricCache: any;

  beforeAll(async () => {
    appServer = await serve({
      fetch: app.fetch,
      port: 0,
    });
  });

  beforeEach(() => {
    mockMetricCache = {
      getMetrics: jest.fn(),
      setMetrics: jest.fn(),
      setMetric: jest.fn(),
    };

    (metricCacheFactory as jest.Mock).mockReturnValue(mockMetricCache);
  });

  afterAll((done) => {
    if (appServer) {
      appServer.close(done);
    }
  });

  describe('GET /', () => {
    it('should return a list of metrics for an athlete from cache', async () => {
      const metrics = [metricData];
      mockMetricCache.getMetrics.mockResolvedValue(metrics);
      jest.spyOn(logger, 'info').mockImplementation();

      const response = await app.request(`/api/v1/athletes/${athleteId}/metrics`);
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body).toEqual(metrics);
      expect(logger.info).toHaveBeenCalledWith(`[REDIS] Retrieved ${metrics.length} metrics`);
    });

    it('should fetch metrics from use case if cache is empty and then cache them', async () => {
      const metrics = [metricData];
      mockMetricCache.getMetrics.mockResolvedValue(null);
      jest.spyOn(getMetricsUseCase, 'execute').mockResolvedValue(metrics);
      mockMetricCache.setMetrics.mockResolvedValue(undefined);

      const response = await app.request(`/api/v1/athletes/${athleteId}/metrics`);
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body).toEqual(metrics);
      expect(mockMetricCache.setMetrics).toHaveBeenCalledWith(athleteId, metrics);
    });

    it('should return an error when retrieving metrics fails', async () => {
      const errorMessage = '[METRIC] Failed to retrieve metrics';
      jest.spyOn(getMetricsUseCase, 'execute').mockRejectedValue(new Error(errorMessage));

      const response = await app.request(`/api/v1/athletes/${athleteId}/metrics`);
      expect(response.status).toBe(500);

      const body = await response.json();
      expect(body.details).toEqual(errorMessage);
    });
  });

  describe('POST /', () => {
    it('should add a new metric for an athlete and store it in cache', async () => {
      const newMetric = { ...metricData, id: 'new-id' };
      jest.spyOn(addMetricUseCase, 'execute').mockResolvedValue(newMetric);
      mockMetricCache.setMetric.mockResolvedValue(undefined);

      const response = await app.request(`/api/v1/athletes/${athleteId}/metrics`, {
        method: 'POST',
        body: JSON.stringify(metricData),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(201);
      const body = await response.json();
      expect(body).toEqual(newMetric);
      expect(mockMetricCache.setMetric).toHaveBeenCalledWith(athleteId, newMetric);
    });

    it('should return an error when adding a metric fails', async () => {
      const errorMessage = '[METRIC] Failed to add metric';
      jest.spyOn(addMetricUseCase, 'execute').mockRejectedValue(new Error(errorMessage));

      const response = await app.request(`/api/v1/athletes/${athleteId}/metrics`, {
        method: 'POST',
        body: JSON.stringify(metricData),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.details).toEqual(errorMessage);
    });
  });
});
