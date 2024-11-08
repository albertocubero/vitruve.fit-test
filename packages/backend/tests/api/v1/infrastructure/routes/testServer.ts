import { Hono } from 'hono';
import { cors } from 'hono/cors'
import apiRouterV1 from '../../../../../src/api/v1/infrastructure/routes/routes';

export const app = new Hono();

app.use('/api/v1/*', cors())
app.route('/api/v1', apiRouterV1);