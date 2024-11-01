import { Hono } from 'hono';
import { athleteController } from './AthleteController';
import { metricsController } from './MetricsController';
import { validateAthleteId } from './validation/athleteIdValidation';

const apiRouter = new Hono();

apiRouter.route('/athletes', athleteController);

apiRouter.use('/athletes/:athleteId/*', validateAthleteId);
apiRouter.route('/athletes/:athleteId/metrics', metricsController);

export default apiRouter;
