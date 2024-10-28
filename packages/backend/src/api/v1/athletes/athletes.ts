import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { errorResponse } from '../../../utils/errorResponse';

const prisma = new PrismaClient();
const v1AthletesRouter = new Hono();

// Crear un nuevo atleta
v1AthletesRouter.post('/', async (c) => {
  const { name, age, team } = await c.req.json();
  try {
    const newAthlete = await prisma.athlete.create({
      data: { name, age, team },
    });
    return c.json(newAthlete, 201);
  } catch (error) {
    return c.json(errorResponse(500, 'Failed to create athlete', error), 500);
  }
});

// Obtener todos los atletas
v1AthletesRouter.get('/', async (c) => {
  try {
    const athletes = await prisma.athlete.findMany();
    return c.json(athletes);
  } catch (error) {
    return c.json(
      errorResponse(500, 'Failed to retrieve athletes', error),
      500
    );
  }
});

// Obtener un atleta específico
v1AthletesRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const athlete = await prisma.athlete.findUnique({
      where: { id },
      include: { metrics: true },
    });
    return athlete
      ? c.json(athlete)
      : c.json(errorResponse(404, 'Athlete not found'), 404);
  } catch (error) {
    return c.json(errorResponse(500, 'Failed to retrieve athlete', error), 500);
  }
});

// Actualizar información de un atleta
v1AthletesRouter.put('/:id', async (c) => {
  const id = c.req.param('id');
  const { name, age, team } = await c.req.json();
  try {
    const updatedAthlete = await prisma.athlete.update({
      where: { id },
      data: { name, age, team },
    });
    return c.json(updatedAthlete);
  } catch (error) {
    return c.json(errorResponse(500, 'Failed to update athlete', error), 500);
  }
});

// Eliminar un atleta
v1AthletesRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const athleteExists = await prisma.athlete.findUnique({
      where: { id },
    });

    if (!athleteExists) {
      return c.json(errorResponse(404, 'Athlete not found'), 404);
    }

    await prisma.metric.deleteMany({ where: { athleteId: id } });
    await prisma.athlete.delete({ where: { id } });

    return c.text('Athlete and metrics deleted', 204);
  } catch (error) {
    return c.json(errorResponse(500, 'Failed to delete athlete', error), 500);
  }
});

export { v1AthletesRouter };
