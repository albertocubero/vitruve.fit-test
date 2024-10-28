import { z } from 'zod';

export const metricSchema = z.object({
  metricType: z.string().min(1, 'Metric type is required'),
  value: z.number().min(0, 'Value must be a positive number'),
  unit: z.string().min(1, 'Unit is required'),
});
