import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const v1MetricsRouter = new Hono();

// Agregar nueva métrica de rendimiento a un atleta
v1MetricsRouter.post('/:id', async (c) => {
  const id = c.req.param('id');
  const athleteExists = await prisma.athlete.findUnique({
    where: { id },
  });

  if (!athleteExists) {
    return c.json({ error: 'Athlete not found' }, 404);
  }

  const { metricType, value, unit } = await c.req.json();
  if (typeof metricType !== 'string' || typeof value !== 'number' || typeof unit !== 'string') {
    return c.json({ error: 'Invalid data provided' }, 400);
  }

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
});

// Obtener todas las métricas de un atleta
v1MetricsRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const metrics = await prisma.metric.findMany({
    where: { athleteId: id },
  });
  return c.json(metrics);
});

export { v1MetricsRouter };
