import Redis from "ioredis"

let redisInstance: Redis | null = null;

export function createRedisClient(): Redis {
  if (!redisInstance) {
    redisInstance = new Redis({
      host: 'redis',
      port: 6379,
      db: 0,
    });
  }
  
  return redisInstance;
}
