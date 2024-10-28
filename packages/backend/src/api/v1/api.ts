import { Hono } from 'hono';
import { v1AthletesRouter } from './athletes';
import { v1MetricsRouter } from './metrics';

const apiRouter = new Hono();

apiRouter.route('/athletes', v1AthletesRouter);
apiRouter.route('/athletes/:id/metrics', v1MetricsRouter);

export default apiRouter;
