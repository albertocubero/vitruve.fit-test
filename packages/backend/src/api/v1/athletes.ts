import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const v1AthletesRouter = new Hono();

// Crear un nuevo atleta
v1AthletesRouter.post('/', async (c) => {
  const { name, age, team } = await c.req.json();
  const newAthlete = await prisma.athlete.create({
    data: { name, age, team },
  });
  return c.json(newAthlete, 201);
});

// Obtener todos los atletas
v1AthletesRouter.get('/', async (c) => {
  const athletes = await prisma.athlete.findMany();
  return c.json(athletes);
});

// Obtener un atleta específico
v1AthletesRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const athlete = await prisma.athlete.findUnique({
    where: { id },
    include: { metrics: true },
  });
  return athlete ? c.json(athlete) : c.notFound();
});

// Actualizar información de un atleta
v1AthletesRouter.put('/:id', async (c) => {
  const id = c.req.param('id');
  const { name, age, team } = await c.req.json();
  const updatedAthlete = await prisma.athlete.update({
    where: { id },
    data: { name, age, team },
  });
  return c.json(updatedAthlete);
});

// Eliminar un atleta
v1AthletesRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const athleteExists = await prisma.athlete.findUnique({
    where: { id },
  });

  if (!athleteExists) {
    return c.json({ error: 'Athlete not found' }, 404);
  }

  await prisma.metric.deleteMany({ where: { athleteId: id } });
  await prisma.athlete.delete({ where: { id } });

  return c.text('Athlete and metrics deleted', 204);
});

export { v1AthletesRouter };
