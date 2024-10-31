import { Context, Next } from 'hono';
import { z } from 'zod';
import logger from '../../../../../utils/logger';
import { errorResponse } from '../../../../../utils/errorResponse';
import { validateAthleteId } from './athleteIdValidation';

export const athleteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0, 'Age must be a positive number'),
  team: z.string(),
});

export const validateCreateAthleteParams = async (c: Context, next: Next) => {
  return validateAthleteParams(c, next, athleteSchema);
};

const validateUpdateAthleteParams = async (c: Context, next: Next) => {
  return validateAthleteParams(c, next, athleteSchema.partial());
};

const validateAthleteParams = async (c: Context, next: Next, schema: z.ZodSchema) => {
  try {
    const parsedBody = await c.req.json();
    const validation = schema.safeParse(parsedBody);

    if (!validation.success) {
      const logMessage = `[ATHLETES] Invalid athlete data: ${JSON.stringify(validation.error.errors)}`;
      logger.error(logMessage);
      return c.json(errorResponse(400, '[ATHLETES] Invalid data', validation.error.errors), 400);
    }

    return await next();
  } catch (error: unknown) {
    logger.error(`[ATHLETES] Failed to validate athlete data: ${error}`);
    return c.json(errorResponse(500, `[ATHLETES] Failed to validate athlete data`, error), 500);
  }
};

export const validateUpdateAthlete = async (c: Context, next: Next) => {
  await validateAthleteId(c, next);
  await validateUpdateAthleteParams(c, next);
};