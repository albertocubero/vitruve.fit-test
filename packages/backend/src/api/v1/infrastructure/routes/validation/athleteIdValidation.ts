import { Context, Next } from 'hono';
import { z } from 'zod';
import { errorResponse } from '../../../../../utils/errorResponse';
import logger from '../../../../../utils/logger';
import { AthleteRepository } from '../../repositories/AthleteRepository';

const athleteRepository = AthleteRepository.create();

export const athleteIdSchema = z.object({
    athleteId: z.string().min(1, 'Athlete ID is required'),
});

export const validateAthleteId = async (c: Context, next: Next) => {
  try {
    const validation = athleteIdSchema.safeParse(c.req.param());
    if (!validation.success) {
      const logMessage = `Invalid Athlete with ID provided: ${validation.error.errors[0].message}`;
      logger.error(logMessage);
      return c.json(errorResponse(400, logMessage), 400);
    }

    const athleteId = validation.data.athleteId;
    const exists = await athleteRepository.exists(athleteId);
    if (!exists) {
      const logMessage = `Athlete with ID ${athleteId} does not exist.`;
      logger.error(logMessage);
      return c.json(errorResponse(404, logMessage), 404);
    }

    return await next();
  } catch (error: unknown) {
    logger.error(`Failed to validate Athlete with ID: ${error}`);
    return c.json(errorResponse(500, `Failed to validate Athlete with ID`, error), 500);
  }
};