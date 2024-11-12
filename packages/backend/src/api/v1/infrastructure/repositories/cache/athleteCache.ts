import Redis from 'ioredis';
import { createRedisClient } from './redisClient';
import { IAthlete } from '../../../domain/entities/Athlete';
import athletesCacheFactory, { IAthletesCache } from './athletesCache';
import metricCacheFactory, { IMetricCache } from './metricCache';

const ATHLETE_CACHE_KEY = 'athlete';

export interface IAthleteCache {
  getAthlete(athleteId?: string): Promise<IAthlete | null>;
  setAthlete(athlete: IAthlete): Promise<void>;
  updateAthlete(athlete: IAthlete): Promise<void>;
  deleteAthlete(athleteId?: string): Promise<void>;
}

export function createAthleteCache(createRedis: Function, athletesCacheFactory: Function, metricCacheFactory: Function): IAthleteCache {
  const redis: Redis = createRedis();
  const athletesCache: IAthletesCache = athletesCacheFactory();
  const metricCache: IMetricCache = metricCacheFactory();
  
  return {
    getAthlete: async (athleteId?: string): Promise<IAthlete | null> => {
      const cachedAthlete = await redis.get(`${ATHLETE_CACHE_KEY}:${athleteId}`);
      return cachedAthlete ? JSON.parse(cachedAthlete) : null;
    },

    setAthlete: async (athlete: IAthlete): Promise<void> => {
      await redis.set(
        `${ATHLETE_CACHE_KEY}:${athlete.id}`,
        JSON.stringify(athlete),
        'EX',
        3600
      );

      const currentAthletes = await athletesCache.getAthletes() || [];
      const updatedAthletes = [...currentAthletes, athlete];
      await athletesCache.setAthletes(updatedAthletes);
    },

    updateAthlete: async (athlete: IAthlete): Promise<void> => {
      await redis.set(
        `${ATHLETE_CACHE_KEY}:${athlete.id}`,
        JSON.stringify(athlete),
        'EX',
        3600
      );

      const currentAthletes = await athletesCache.getAthletes() || [];
      const updatedAthletes = currentAthletes.map((existingAthlete) =>
        existingAthlete.id === athlete.id ? athlete : existingAthlete
      );

      await athletesCache.setAthletes(updatedAthletes);
    },

    deleteAthlete: async (athleteId?: string): Promise<void> => {
      if (athleteId) {
        await redis.del(`${ATHLETE_CACHE_KEY}:${athleteId}`);

        await metricCache.deleteMetrics(athleteId);

        const currentAthletes = await athletesCache.getAthletes() || [];
        const updatedAthletes = currentAthletes.filter((athlete) => athlete.id !== athleteId);
        await athletesCache.setAthletes(updatedAthletes);
      }
    },
  };
}

function athleteCacheFactory (): IAthleteCache {
  return createAthleteCache(createRedisClient, athletesCacheFactory, metricCacheFactory);
}

export default athleteCacheFactory;