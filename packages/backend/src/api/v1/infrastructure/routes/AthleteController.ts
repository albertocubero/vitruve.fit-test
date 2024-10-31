import { Hono } from 'hono';
import { AthleteRepository } from '../repositories/AthleteRepository';
import { CreateAthleteUseCase } from '../../application/usecases/CreateAthleteUseCase';
import { GetAllAthletesUseCase } from '../../application/usecases/GetAllAthletesUseCase';
import { GetAthleteUseCase } from '../../application/usecases/GetAthleteUseCase';
import { UpdateAthleteUseCase } from '../../application/usecases/UpdateAthleteUseCase';
import { validateCreateAthleteParams, validateUpdateAthlete } from './validation/athleteValidation';
import { errorResponse, errorLogMessage } from '../../../../utils/errorResponse';
import logger from '../../../../utils/logger';
import { validateAthleteId } from './validation/athleteIdValidation';
import { MetricRepository } from '../repositories/MetricRepository';

const metricRepository = new MetricRepository();
const athleteRepository = new AthleteRepository(metricRepository);
const createAthleteUseCase = new CreateAthleteUseCase(athleteRepository);
const getAllAthletesUseCase = new GetAllAthletesUseCase(athleteRepository);
const getAthleteUseCase = new GetAthleteUseCase(athleteRepository);
const updateAthleteUseCase = new UpdateAthleteUseCase(athleteRepository);

export const athleteController = new Hono();

athleteController.post('/', validateCreateAthleteParams, async (c) => {
  try {
    const { name, age, team } = await c.req.json();
    const newAthlete = await createAthleteUseCase.execute({ name, age, team });
    logger.info(`Created athlete: ${newAthlete.id}`);
    return c.json(newAthlete, 201);
  } catch (error: unknown) {
    const logMessage = '[ATHLETES] Failed to create athlete';
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});

athleteController.get('/', async (c) => {
  try {
    const athletes = await getAllAthletesUseCase.execute();
    logger.info(`Retrieved ${athletes.length} athletes`);
    return c.json(athletes);
  } catch (error: unknown) {
    const logMessage = '[ATHLETES] Failed to retrieve athletes';
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});

athleteController.get('/:athleteId', validateAthleteId, async (c) => {
  const athleteId = c.req.param('athleteId') as string;
  try {
    const athlete = await getAthleteUseCase.execute(athleteId);
    if (athlete) {
      logger.info(`Retrieved athlete: ${athleteId}`);
      return c.json(athlete);
    } else {
      logger.warn(`Athlete not found: ${athleteId}`);
      return c.json(errorResponse(404, 'Athlete not found'), 404);
    }
  } catch (error: unknown) {
    const logMessage = `[ATHLETES] Failed to retrieve athlete with id [${athleteId}]`;
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});

athleteController.put('/:athleteId', validateUpdateAthlete, async (c) => {
  const athleteId = c.req.param('athleteId') as string;

  try {
    const dataToUpdate = await c.req.json();
    const updatedAthlete = await updateAthleteUseCase.execute(athleteId, dataToUpdate);
    logger.info(`Updated athlete: ${athleteId}`);
    return c.json(updatedAthlete);
  } catch (error: unknown) {
    const logMessage = `[ATHLETES] Failed to update athlete with id [${athleteId}]`;
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});

athleteController.delete('/:athleteId', validateAthleteId, async (c) => {
  const athleteId = c.req.param('athleteId') as string;

  try {
    await athleteRepository.delete(athleteId);
    logger.info(`Deleted athlete and associated metrics: ${athleteId}`);
    return c.json({ message: `Athlete with id ${athleteId} deleted successfully.` }, 200);
  } catch (error: unknown) {
    const logMessage = `[ATHLETES] Failed to delete athlete with id [${athleteId}]`;
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});