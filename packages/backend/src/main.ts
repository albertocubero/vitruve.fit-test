
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import v1Router from './api/v1/api';

const app = new Hono();

app.route('/v1', v1Router);

app.onError((err, c) => {
  console.error(err);
  return c.text('Internal Server Error', 500);
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
