import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import logger from './utils/logger';
import apiRouterV1 from './api/v1/infrastructure/routes/routes';

const app = new Hono();

app.route('/api/v1', apiRouterV1);

app.onError((err, c) => {
  logger.error(err.message);
  return c.json({ error: 'Internal Server Error' }, 500);
});

serve(app, (info) => {
  logger.info(`Listening on http://localhost:${info.port}`);
});
