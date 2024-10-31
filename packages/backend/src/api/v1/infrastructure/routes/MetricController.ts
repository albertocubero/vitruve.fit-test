import { Hono } from 'hono';
import { MetricRepository } from '../repositories/MetricRepository';
import { AddMetricUseCase } from '../../application/usecases/AddMetricUseCase';
import { GetMetricsUseCase } from '../../application/usecases/GetMetricsUseCase';
import {
  errorLogMessage,
  errorResponse,
} from '../../../../utils/errorResponse';
import logger from '../../../../utils/logger';
import { validateAddMetricParams } from './validation/metricValidation';

const metricRepository = new MetricRepository();
const addMetricUseCase = new AddMetricUseCase(metricRepository);
const getMetricsUseCase = new GetMetricsUseCase(metricRepository);

export const metricController = new Hono();

metricController.post('/', validateAddMetricParams, async (c) => {
  const athleteId = c.req.param('athleteId') as string;
  const { metricType, value, unit } = await c.req.json();

  try {
    const metric = await addMetricUseCase.execute({
      athleteId,
      metricType,
      value,
      unit,
    });
    return c.json(metric, 201);
  } catch (error: unknown) {
    const errorMessage = '[METRIC] Failed to add metric';
    logger.error(errorLogMessage(errorMessage, error));
    return c.json(errorResponse(500, errorMessage, error), 500);
  }
});

metricController.get('/', async (c) => {
  const athleteId = c.req.param('athleteId') as string;

  try {
    const metrics = await getMetricsUseCase.execute(athleteId);
    return c.json(metrics);
  } catch (error: unknown) {
    const errorMessage = '[METRIC] Failed to retrieve metrics';
    logger.error(errorLogMessage(errorMessage, error));
    return c.json(errorResponse(500, errorMessage, error), 500);
  }
});
