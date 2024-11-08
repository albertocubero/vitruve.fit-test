import { Context, Hono } from 'hono';
import { createAthleteUseCase } from '../../application/usecases/athletes/CreateAthleteUseCase';
import { getAllAthletesUseCase } from '../../application/usecases/athletes/GetAllAthletesUseCase';
import { getAthleteUseCase } from '../../application/usecases/athletes/GetAthleteUseCase';
import { updateAthleteUseCase } from '../../application/usecases/athletes/UpdateAthleteUseCase';
import { deleteAthleteUseCase } from '../../application/usecases/athletes/DeleteAthleteUseCase';
import { validateCreateAthleteParams, validateUpdateAthlete } from './validation/athleteValidation';
import { validateAthleteId } from './validation/athleteIdValidation';
import { Athlete, IAthlete } from '../../domain/entities/Athlete';
import { errorResponse, errorLogMessage } from '../../../../utils/errorResponse';
import logger from '../../../../utils/logger';

export const athleteController = new Hono();

athleteController.get('/', async (c: Context) => {
  try {
    const athletes: IAthlete[] = await getAllAthletesUseCase.execute();
    logger.info(`[ATHLETES] Retrieved ${athletes.length} athletes`);
    return c.json(athletes);
  } catch (error: unknown) {
    const logMessage = '[ATHLETES] Failed to retrieve athletes';
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});

athleteController.post('/', validateCreateAthleteParams, async (c: Context) => {
  try {
    const { name, age, team }: IAthlete = await c.req.json<IAthlete>();
    const athlete: IAthlete = Athlete.create({name, age, team});

    const newAthlete = await createAthleteUseCase.execute(athlete);
    logger.info(`[ATHLETES] Created athlete: ${newAthlete.id}`);
    return c.json(newAthlete, 201);
  } catch (error: unknown) {
    const logMessage = '[ATHLETES] Failed to create athlete';
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});

athleteController.get('/:athleteId', validateAthleteId, async (c: Context) => {
  const athleteId: string = c.req.param('athleteId');
  try {
    const athlete: IAthlete | null = await getAthleteUseCase.execute(athleteId);
    if (athlete) {
      logger.info(`[ATHLETES] Retrieved athlete: ${athleteId}`);
      return c.json(athlete);
    } else {
      logger.warn(`[ATHLETES] Athlete not found: ${athleteId}`);
      return c.json(errorResponse(404, 'Athlete not found'), 404);
    }
  } catch (error: unknown) {
    const logMessage = `[ATHLETES] Failed to retrieve athlete with id [${athleteId}]`;
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});

athleteController.put('/:athleteId', validateUpdateAthlete, async (c: Context) => {
  const athleteId: string = c.req.param('athleteId');

  try {
    const dataToUpdate: Partial<IAthlete> = await c.req.json<IAthlete>();
    const updatedAthlete = await updateAthleteUseCase.execute(athleteId, dataToUpdate);
    logger.info(`[ATHLETES] Updated athlete: ${athleteId}`);
    return c.json(updatedAthlete);
  } catch (error: unknown) {
    const logMessage = `[ATHLETES] Failed to update athlete with id [${athleteId}]`;
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});

athleteController.delete('/:athleteId', validateAthleteId, async (c: Context) => {
  const athleteId: string = c.req.param('athleteId');

  try {
    await deleteAthleteUseCase.execute(athleteId);
    logger.info(`[ATHLETES] Deleted athlete and associated metrics: ${athleteId}`);
    return c.json({ message: `[ATHLETES] Athlete with id ${athleteId} deleted successfully.` }, 200);
  } catch (error: unknown) {
    const logMessage = `[ATHLETES] Failed to delete athlete with id [${athleteId}]`;
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});