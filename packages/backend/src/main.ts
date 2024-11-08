import { Hono, Context } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors'
import apiRouterV1 from './api/v1/infrastructure/routes/routes';
import logger from './utils/logger';

export const app = new Hono();

app.use('/api/v1/*', cors())
app.route('/api/v1', apiRouterV1);

app.onError((err: Error, c: Context)  => {
  logger.error(err.message);
  return c.json({ error: 'Internal Server Error' }, 500);
});

serve(app, (info) => {
  logger.info(`Listening on http://127.0.0.1:${info.port}`);
});