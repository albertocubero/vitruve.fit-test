import Redis from 'ioredis';
import { IMetric } from '../../../domain/entities/Metric';
import { createRedisClient } from './redisClient';

const METRIC_CACHE_KEY = 'metrics';

export interface IMetricCache {
  getMetrics(athleteId: string): Promise<IMetric[] | null>;
  setMetric(athleteId: string, newMetric: IMetric): Promise<void>;
  setMetrics(athleteId: string, newMetrics: IMetric[]): Promise<void>;
  deleteMetrics(athleteId: string): Promise<void>;
}

export function createMetricCache(createRedisClient: Function): IMetricCache {
  const redis: Redis = createRedisClient();
  return {
    getMetrics: async (athleteId: string): Promise<IMetric[] | null> => {
      const cachedMetrics = await redis.get(`${METRIC_CACHE_KEY}:${athleteId}`);
      return cachedMetrics ? JSON.parse(cachedMetrics) : null;
    },

    setMetric: async (athleteId: string, newMetric: IMetric): Promise<void> => {
      const cachedMetrics = await redis.get(`${METRIC_CACHE_KEY}:${athleteId}`);
      const currentMetrics = cachedMetrics ? JSON.parse(cachedMetrics) : [];
      
      const updatedMetrics = [...currentMetrics, newMetric];
      
      await redis.set(`${METRIC_CACHE_KEY}:${athleteId}`, JSON.stringify(updatedMetrics), 'EX', 3600);
    },

    setMetrics: async (athleteId: string, newMetrics: IMetric[]): Promise<void> => {
      const cachedMetrics = await redis.get(`${METRIC_CACHE_KEY}:${athleteId}`);
      const currentMetrics = cachedMetrics ? JSON.parse(cachedMetrics) : [];
      
      const updatedMetrics = [...currentMetrics, ...newMetrics];
      
      await redis.set(`${METRIC_CACHE_KEY}:${athleteId}`, JSON.stringify(updatedMetrics), 'EX', 3600);
    },

    deleteMetrics: async (athleteId: string): Promise<void> => {
      await redis.del(`${METRIC_CACHE_KEY}:${athleteId}`);
    },
  };
}

function metricCacheFactory (): IMetricCache {
  return createMetricCache(createRedisClient);
}

export default metricCacheFactory;
