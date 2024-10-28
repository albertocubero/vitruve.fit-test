
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import v1Router from './api/v1/api';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const app = new Hono();

app.route('/v1', v1Router);

app.onError((err, c) => {
  console.error(err);
  if (err instanceof PrismaClientKnownRequestError) {
    return c.json({ error: 'Database error', details: err.message }, 500);
  }
  return c.json({ error: 'Internal Server Error' }, 500);
});


serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
