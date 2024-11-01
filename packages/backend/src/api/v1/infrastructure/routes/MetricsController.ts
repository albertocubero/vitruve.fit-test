import { Hono, Context } from 'hono';
import { AddMetricUseCase, IAddMetricUseCase } from '../../application/usecases/metrics/AddMetricUseCase';
import { GetMetricsUseCase, IGetMetricsUseCase } from '../../application/usecases/metrics/GetMetricsUseCase';
import {
  errorLogMessage,
  errorResponse,
} from '../../../../utils/errorResponse';
import logger from '../../../../utils/logger';
import { validateAddMetricParams } from './validation/metricValidation';
import { IMetric } from '../../domain/entities/Metric';

const addMetricUseCase: IAddMetricUseCase = AddMetricUseCase.create();
const getMetricsUseCase: IGetMetricsUseCase = GetMetricsUseCase.create();

export const metricsController = new Hono();

metricsController.get('/', async (c: Context): Promise<Response> => {
  const athleteId: string = c.req.param('athleteId') as string;

  try {
    const metrics: IMetric[] = await getMetricsUseCase.execute(athleteId);
    return c.json(metrics);
  } catch (error: unknown) {
    const errorMessage = '[METRIC] Failed to retrieve metrics';
    logger.error(errorLogMessage(errorMessage, error));
    return c.json(errorResponse(500, errorMessage, error), 500);
  }
});

metricsController.post('/', validateAddMetricParams, async (c: Context): Promise<Response> => {
  const athleteId: string = c.req.param('athleteId') as string;
  const { metricType, value, unit }: IMetric = await c.req.json();

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