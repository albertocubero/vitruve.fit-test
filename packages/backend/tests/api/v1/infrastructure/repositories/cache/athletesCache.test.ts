jest.mock('../../../../../../src/api/v1/infrastructure/repositories/cache/redisClient');

import { createAthletesCache, IAthletesCache } from '../../../../../../src/api/v1/infrastructure/repositories/cache/athletesCache';
import { IAthlete } from '../../../../../../src/api/v1/domain/entities/Athlete';

describe('AthleteCache', () => {
  let mockRedis: { get: jest.Mock; set: jest.Mock };
  let athleteCache: IAthletesCache;
  let createRedisClient;

  const mockAthlete: IAthlete = {
    id: 'athlete1',
    name: 'Test Athlete',
    age: 25,
    team: 'Test Team',
  };
  const mockAthletes: IAthlete[] = [mockAthlete];

  beforeEach(() => {
    mockRedis = {
      get: jest.fn(),
      set: jest.fn(),
    };
    createRedisClient = () => mockRedis;
    athleteCache = createAthletesCache(createRedisClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAthletes', () => {
    it('should return cached athletes when they exist', async () => {
      mockRedis.get.mockResolvedValueOnce(JSON.stringify(mockAthletes));

      const athletes = await athleteCache.getAthletes();

      expect(mockRedis.get).toHaveBeenCalledWith('athletes');
      expect(athletes).toEqual(mockAthletes);
    });

    it('should return null when no athletes are cached', async () => {
      mockRedis.get.mockResolvedValueOnce(null);

      const athletes = await athleteCache.getAthletes();

      expect(mockRedis.get).toHaveBeenCalledWith('athletes');
      expect(athletes).toBeNull();
    });
  });

  describe('setAthletes', () => {
    it('should cache athletes', async () => {
      await athleteCache.setAthletes(mockAthletes);

      expect(mockRedis.set).toHaveBeenCalledWith(
        'athletes',
        JSON.stringify(mockAthletes),
        'EX',
        3600
      );
    });
  });
});
