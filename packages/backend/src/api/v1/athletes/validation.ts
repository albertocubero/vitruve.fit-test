import { z } from 'zod';

export const athleteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0, 'Age must be a positive number'),
  team: z.string(),
});

export const updateAthleteSchema = athleteSchema.partial();
