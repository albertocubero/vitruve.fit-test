import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import v1Router from './api/v1/api';
import logger from './utils/logger';

const app = new Hono();

app.route('/api/v1', v1Router);

app.onError((err, c) => {
  logger.error(err.message);
  console.error(err);
  if (err instanceof PrismaClientKnownRequestError) {
    return c.json({ error: 'Database error', details: err.message }, 500);
  }
  return c.json({ error: 'Internal Server Error' }, 500);
});

serve(app, (info) => {
  logger.info(`Listening on http://localhost:${info.port}`);
});
