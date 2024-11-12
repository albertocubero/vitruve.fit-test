import { Hono, Context } from 'hono';
import { addMetricUseCase } from '../../application/usecases/metrics/AddMetricUseCase';
import { getMetricsUseCase } from '../../application/usecases/metrics/GetMetricsUseCase';
import {
  errorLogMessage,
  errorResponse,
} from '../../../../utils/errorResponse';
import logger from '../../../../utils/logger';
import { validateAddMetricParams } from './validation/metricValidation';
import { IMetric, Metric } from '../../domain/entities/Metric';
import { Response } from 'hono/dist/types/client/types';
import metricCacheFactory from '../repositories/cache/metricCache';

export const metricsController = new Hono();

metricsController.get('/', async (c: Context): Promise<Response> => {  
  try {
    const athleteId: string = c.req.param('athleteId');
    const metricCache = metricCacheFactory();
    let metrics: IMetric[] | null = await metricCache.getMetrics(athleteId);

    if (!metrics) {
      metrics = await getMetricsUseCase.execute(athleteId);
      await metricCache.setMetrics(athleteId, metrics);
    } else {
      logger.info(`[REDIS] Retrieved ${metrics.length} metrics`);
    }

    logger.info(`[ATHLETES] Retrieved ${metrics.length} metrics`);
    return c.json(metrics);
  } catch (error: unknown) {
    const errorMessage = '[METRIC] Failed to retrieve metrics';
    logger.error(errorLogMessage(errorMessage, error));
    return c.json(errorResponse(500, errorMessage, error), 500);
  }
});

metricsController.post('/', validateAddMetricParams, async (c: Context): Promise<Response> => {
  try {
    const athleteId: string = c.req.param('athleteId');
    const { metricType, value, unit }: IMetric = await c.req.json<IMetric>();
    const metric: IMetric = Metric.create({ athleteId, metricType, value, unit });

    const savedMetric = await addMetricUseCase.execute(metric);
    const metricCache = metricCacheFactory();
    await metricCache.setMetric(athleteId, savedMetric)
    
    logger.info(`[METRIC] Created metric: ${savedMetric.id}`);
    return c.json(savedMetric, 201);
  } catch (error: unknown) {
    const errorMessage = '[METRIC] Failed to add metric';
    logger.error(errorLogMessage(errorMessage, error));
    return c.json(errorResponse(500, errorMessage, error), 500);
  }
});