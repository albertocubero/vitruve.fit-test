import { Hono } from 'hono';
import { athleteController } from './AthleteController';
import { metricController } from './MetricController';
import { validateAthleteId } from './validation/athleteIdValidation';

const apiRouter = new Hono();

apiRouter.route('/athletes', athleteController);

apiRouter.use('/athletes/:athleteId/*', validateAthleteId);
apiRouter.route('/athletes/:athleteId/metrics', metricController);

export default apiRouter;
