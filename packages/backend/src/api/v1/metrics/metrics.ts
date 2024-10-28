import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { metricSchema } from './validation';
import { errorResponse, errorLogMessage } from '../../../utils/errorResponse';
import logger from '../../../utils/logger';

const prisma = new PrismaClient();
const v1MetricsRouter = new Hono();

// Agregar nueva métrica de rendimiento a un atleta
v1MetricsRouter.post('/:id', async (c) => {
  const id = c.req.param('id');

  try {
    const athleteExists = await prisma.athlete.findUnique({
      where: { id },
    });

    if (!athleteExists) {
      const logMessage = errorLogMessage('Athlete not found', { id });
      logger.error(logMessage);
      return c.json(errorResponse(404, 'Athlete not found'), 404);
    }

    const parsedBody = await c.req.json();
    const validation = metricSchema.safeParse(parsedBody);
    if (!validation.success) {
      const logMessage = errorLogMessage(
        'Invalid data provided',
        validation.error.errors
      );
      logger.error(logMessage);
      return c.json(
        errorResponse(400, 'Invalid data provided', validation.error.errors),
        400
      );
    }

    const { metricType, value, unit } = validation.data;

    try {
      const newMetric = await prisma.metric.create({
        data: {
          athleteId: id,
          metricType,
          value,
          unit,
          timestamp: new Date(),
        },
      });
      return c.json(newMetric, 201);
    } catch (error: unknown) {
      logger.error(errorLogMessage('Failed to create metric', error));
      return c.json(errorResponse(500, 'Failed to create metric', error), 500);
    }
  } catch (error: unknown) {
    logger.error(errorLogMessage('Failed to add metric', error));
    return c.json(errorResponse(500, 'Failed to add metric', error), 500);
  }
});

// Obtener todas las métricas de un atleta
v1MetricsRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const metrics = await prisma.metric.findMany({
      where: { athleteId: id },
    });
    return c.json(metrics);
  } catch (error: unknown) {
    logger.error(errorLogMessage('Failed to retrieve metrics', error));
    return c.json(errorResponse(500, 'Failed to retrieve metrics', error), 500);
  }
});

export { v1MetricsRouter };
