import Redis from 'ioredis';
import { createRedisClient } from './redisClient';
import { IAthlete } from '../../../domain/entities/Athlete';

const ATHLETES_CACHE_KEY = 'athletes';

export interface IAthletesCache {
  getAthletes(): Promise<IAthlete[] | null>;
  setAthletes(athletes: IAthlete[]): Promise<void>;
}

export function createAthletesCache(createRedisClient: Function): IAthletesCache {
  const redis: Redis = createRedisClient();
  return {
    getAthletes: async (): Promise<IAthlete[] | null> => {
      const cachedAthletes = await redis.get(`${ATHLETES_CACHE_KEY}`);
      return cachedAthletes ? JSON.parse(cachedAthletes) : null;
    },

    setAthletes: async (athletes: IAthlete[]): Promise<void> => {
      await redis.set(`${ATHLETES_CACHE_KEY}`, JSON.stringify(athletes), 'EX', 3600);
    },
  };
}

function athletesCacheFactory (): IAthletesCache {
  return createAthletesCache(createRedisClient);
}

export default athletesCacheFactory;