import { Context, Hono } from 'hono';
import { athleteController } from './AthleteController';
import { metricsController } from './MetricsController';
import { validateAthleteId } from './validation/athleteIdValidation';

const apiRouter = new Hono();

apiRouter.route('/athletes', athleteController);

apiRouter.use('/athletes/:athleteId/*', validateAthleteId);
apiRouter.route('/athletes/:athleteId/metrics', metricsController);

apiRouter.get('/health', (c: Context) => {
  return c.json({ status: 'API is running' }, 200);
});

export default apiRouter;
