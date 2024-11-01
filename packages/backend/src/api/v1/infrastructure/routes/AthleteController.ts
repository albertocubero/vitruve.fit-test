import { Context, Hono } from 'hono';
import { CreateAthleteUseCase, ICreateAthleteUseCase } from '../../application/usecases/athletes/CreateAthleteUseCase';
import { GetAllAthletesUseCase, IGetAllAthletesUseCase } from '../../application/usecases/athletes/GetAllAthletesUseCase';
import { GetAthleteUseCase, IGetAthleteUseCase } from '../../application/usecases/athletes/GetAthleteUseCase';
import { IUpdateAthleteUseCase, UpdateAthleteUseCase } from '../../application/usecases/athletes/UpdateAthleteUseCase';
import { validateCreateAthleteParams, validateUpdateAthlete } from './validation/athleteValidation';
import { validateAthleteId } from './validation/athleteIdValidation';
import { IAthlete } from '../../domain/entities/Athlete';
import { errorResponse, errorLogMessage } from '../../../../utils/errorResponse';
import logger from '../../../../utils/logger';
import { DeleteAthleteUseCase, IDeleteAthleteUseCase } from '../../application/usecases/athletes/DeleteAthleteUseCase';

const createAthleteUseCase: ICreateAthleteUseCase = CreateAthleteUseCase.create();
const getAllAthletesUseCase: IGetAllAthletesUseCase = GetAllAthletesUseCase.create();
const getAthleteUseCase: IGetAthleteUseCase = GetAthleteUseCase.create();
const updateAthleteUseCase: IUpdateAthleteUseCase = UpdateAthleteUseCase.create();
const deleteAthleteUseCase: IDeleteAthleteUseCase = DeleteAthleteUseCase.create();

export const athleteController = new Hono();

athleteController.get('/', async (c: Context) => {
  try {
    const athletes = await getAllAthletesUseCase.execute();
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
    const { name, age, team }: IAthlete = await c.req.json();
    const newAthlete = await createAthleteUseCase.execute({ name, age, team });
    logger.info(`[ATHLETES] Created athlete: ${newAthlete.id}`);
    return c.json(newAthlete, 201);
  } catch (error: unknown) {
    const logMessage = '[ATHLETES] Failed to create athlete';
    logger.error(errorLogMessage(logMessage, error));
    return c.json(errorResponse(500, logMessage, error), 500);
  }
});

athleteController.get('/:athleteId', validateAthleteId, async (c: Context) => {
  const athleteId: string = c.req.param('athleteId') as string;
  try {
    const athlete = await getAthleteUseCase.execute(athleteId);
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
  const athleteId:string = c.req.param('athleteId') as string;

  try {
    const dataToUpdate: Partial<IAthlete> = await c.req.json();
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
  const athleteId: string = c.req.param('athleteId') as string;

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