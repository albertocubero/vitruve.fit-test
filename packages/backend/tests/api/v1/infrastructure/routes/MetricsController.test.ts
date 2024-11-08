import { serve } from '@hono/node-server';
import { addMetricUseCase } from '../../../../../src/api/v1/application/usecases/metrics/AddMetricUseCase';
import { getMetricsUseCase } from '../../../../../src/api/v1/application/usecases/metrics/GetMetricsUseCase';
import { app } from './testServer';

jest.mock(
  '../../../../../src/api/v1/application/usecases/metrics/AddMetricUseCase'
);
jest.mock(
  '../../../../../src/api/v1/application/usecases/metrics/GetMetricsUseCase'
);
jest.mock('../../../../../src/utils/logger');
jest.mock(
  '../../../../../src/api/v1/infrastructure/routes/validation/athleteIdValidation',
  () => ({
    validateAthleteId: jest.fn().mockImplementation((c, next) => next()),
  })
);
jest.mock(
  '../../../../../src/api/v1/infrastructure/routes/validation/athleteValidation',
  () => ({
    validateCreateAthleteParams: jest.fn().mockImplementation((c, next) => next()),
    validateUpdateAthlete: jest.fn().mockImplementation((c, next) => next()),
  })
);
jest.mock(
  '../../../../../src/api/v1/infrastructure/routes/validation/metricValidation',
  () => ({
    validateAddMetricParams: jest.fn().mockImplementation((c, next) => next()),
  })
);

describe('metricsController', () => {
  const athleteId = '123';
  const metricData = {
    athleteId,
    metricType: 'speed',
    value: 12.5,
    unit: 'km/h',
  };

  let appServer: any;

  beforeAll(async () => {
    appServer = await serve({
      fetch: app.fetch,
      port: 0,
    });
  });

  afterAll((done) => {
    if (appServer) {
      appServer.close(done);
    }
  });

  describe('GET /', () => {
    it('should return a list of metrics for an athlete', async () => {
      const metrics = [metricData];
      jest.spyOn(getMetricsUseCase, 'execute').mockResolvedValue(metrics);

      const response = await app.request(
        `/api/v1/athletes/${athleteId}/metrics`
      );

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual(metrics);
    });

    it('should return an error when retrieving metrics fails', async () => {
      const errorMessage = 'Failed to retrieve metrics';
      jest
        .spyOn(getMetricsUseCase, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      const response = await app.request(
        `/api/v1/athletes/${athleteId}/metrics`
      );

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.details).toEqual(errorMessage);
    });
  });

  describe('POST /', () => {
    it('should add a new metric for an athlete', async () => {
      const newMetric = { ...metricData, id: 'new-id' };
      jest.spyOn(addMetricUseCase, 'execute').mockResolvedValue(newMetric);

      const response = await app.request(
        `/api/v1/athletes/${athleteId}/metrics`,
        {
          method: 'POST',
          body: JSON.stringify(metricData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      expect(response.status).toBe(201);
      const body = await response.json();
      expect(body).toEqual(newMetric);
    });

    it('should return an error when adding a metric fails', async () => {
      const errorMessage = 'Failed to add metric';
      jest
        .spyOn(addMetricUseCase, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      const response = await app.request(
        `/api/v1/athletes/${athleteId}/metrics`,
        {
          method: 'POST',
          body: JSON.stringify(metricData),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.details).toEqual(errorMessage);
    });
  });
});
