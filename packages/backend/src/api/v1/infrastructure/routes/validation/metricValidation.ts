import { Context, Next } from 'hono';
import { z } from 'zod';
import { errorResponse } from '../../../../../utils/errorResponse';
import logger from '../../../../../utils/logger';

export const metricSchema = z.object({
  metricType: z.string(),
  value: z.number().positive(),
  unit: z.string(),
});

export const validateAddMetricParams = async (c: Context, next: Next) => {
  try {
    const parsedBody = await c.req.json();
    const validation = metricSchema.safeParse(parsedBody);

    if (!validation.success) {
      const logMessage = `[ADD METRIC] Invalid params provided: ${JSON.stringify(validation.error.errors)}`;
      logger.error(logMessage);
      return c.json(
        errorResponse(400, '[ADD METRIC] Invalid params provided', validation.error.errors),
        400
      );
    }

    return await next();
  } catch (error: unknown) {
    logger.error(`Failed to validate metric schema: ${error}`);
    return c.json(errorResponse(500, 'Failed to validate metric schema', error), 500);
  }
};
