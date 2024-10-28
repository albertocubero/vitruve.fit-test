import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { metricSchema } from './validation';
import { errorResponse } from '../../../utils/errorResponse';

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
      return c.json(errorResponse(404, 'Athlete not found'), 404);
    }

    const parsedBody = await c.req.json();

    // Validar el cuerpo de la solicitud
    const validation = metricSchema.safeParse(parsedBody);
    if (!validation.success) {
      return c.json(
        errorResponse(400, 'Invalid data provided', validation.error.errors),
        400
      ); // Usar respuesta de error
    }

    const { metricType, value, unit } = validation.data; // Usa los datos validados

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
  } catch (error) {
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
  } catch (error) {
    return c.json(errorResponse(500, 'Failed to retrieve metrics', error), 500);
  }
});

export { v1MetricsRouter };
