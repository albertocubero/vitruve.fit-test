import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const app = new Hono();
const prisma = new PrismaClient();

// Middleware para manejar errores
app.onError((err, c) => {
  console.error(err);
  return c.text('Internal Server Error', 500);
});

// Crear un nuevo atleta
app.post('/athletes', async (c) => {
  const { name, age, team } = await c.req.json();
  const newAthlete = await prisma.athlete.create({
    data: { name, age, team },
  });
  return c.json(newAthlete, 201);
});

// Obtener todos los atletas
app.get('/athletes', async (c) => {
  const athletes = await prisma.athlete.findMany();
  return c.json(athletes);
});

// Obtener un atleta específico
app.get('/athletes/:id', async (c) => {
  const id = c.req.param('id');
  const athlete = await prisma.athlete.findUnique({
    where: { id },
    include: { metrics: true },
  });
  return athlete ? c.json(athlete) : c.notFound();
});

// Actualizar información de un atleta
app.put('/athletes/:id', async (c) => {
  const id = c.req.param('id');
  const { name, age, team } = await c.req.json();
  const updatedAthlete = await prisma.athlete.update({
    where: { id },
    data: { name, age, team },
  });
  return c.json(updatedAthlete);
});

// Agregar nueva métrica de rendimiento a un atleta
app.post('/athletes/:id/metrics', async (c) => {
  const id = c.req.param('id');

  // Verifica si el ID del atleta es válido
  const athleteExists = await prisma.athlete.findUnique({
    where: { id },
  });

  if (!athleteExists) {
    return c.json({ error: 'Athlete not found' }, 404);
  }

  const { metricType, value, unit } = await c.req.json();

  // Validaciones adicionales (opcional)
  if (
    typeof metricType !== 'string' ||
    typeof value !== 'number' ||
    typeof unit !== 'string'
  ) {
    return c.json({ error: 'Invalid data provided' }, 400);
  }

  const newMetric = await prisma.metric.create({
    data: {
      athleteId: id,
      metricType,
      value,
      unit,
      timestamp: new Date(), // Asegúrate de establecer el timestamp si es necesario
    },
  });

  return c.json(newMetric, 201);
});

// Obtener todas las métricas de un atleta
app.get('/athletes/:id/metrics', async (c) => {
  const id = c.req.param('id');
  const metricType = c.req.query('metricType');

  // Verifica si el atleta existe antes de buscar las métricas
  const athleteExists = await prisma.athlete.findUnique({
    where: { id },
  });

  if (!athleteExists) {
    return c.json({ error: 'Athlete not found' }, 404);
  }

  const metrics = await prisma.metric.findMany({
    // Cambia a prisma.metric
    where: {
      athleteId: id,
      ...(metricType ? { metricType } : {}),
    },
  });

  return c.json(metrics);
});

// Eliminar un atleta y sus métricas de rendimiento
app.delete('/athletes/:id', async (c) => {
  const id = c.req.param('id');

  // Verifica si el atleta existe antes de intentar eliminar
  const athleteExists = await prisma.athlete.findUnique({
    where: { id },
  });

  if (!athleteExists) {
    return c.json({ error: 'Athlete not found' }, 404);
  }

  await prisma.metric.deleteMany({ where: { athleteId: id } }); // Cambia a prisma.metric
  await prisma.athlete.delete({ where: { id } });

  return c.text('Athlete and metrics deleted', 204);
});

// Iniciar el servidor
serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`); // Listening on http://localhost:3000
});
