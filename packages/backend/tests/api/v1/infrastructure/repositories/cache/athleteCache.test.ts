jest.mock('../../../../../../src/api/v1/infrastructure/repositories/cache/redisClient');

import { createAthleteCache, IAthleteCache } from '../../../../../../src/api/v1/infrastructure/repositories/cache/athleteCache';
import { IAthlete } from '../../../../../../src/api/v1/domain/entities/Athlete';

describe('AthleteCache', () => {
  let mockRedis: { get: jest.Mock; set: jest.Mock; del: jest.Mock };
  let mockAthletesCache: { getAthletes: jest.Mock; setAthletes: jest.Mock };
  let mockMetricCache: { deleteMetrics: jest.Mock };
  let athleteCache: IAthleteCache;
  let createRedisClient, createAthletesCache, createMetricCache;

  const athleteId = 'athlete1';
  const mockAthlete: IAthlete = {
    id: athleteId,
    name: 'Test Athlete',
    age: 25,
    team: 'Test Team',
  };

  beforeEach(() => {
    mockRedis = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };
    createRedisClient = () => mockRedis;
    mockAthletesCache = {
      getAthletes: jest.fn(),
      setAthletes: jest.fn(),
    };
    createAthletesCache = () => mockAthletesCache;
    mockMetricCache = {
      deleteMetrics: jest.fn(),
    };
    createMetricCache = () => mockMetricCache;

    athleteCache = createAthleteCache(createRedisClient, createAthletesCache, createMetricCache);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAthlete', () => {
    it('should return the cached athlete when it exists', async () => {
      mockRedis.get.mockResolvedValueOnce(JSON.stringify(mockAthlete));

      const athlete = await athleteCache.getAthlete(athleteId);

      expect(mockRedis.get).toHaveBeenCalledWith(`athlete:${athleteId}`);
      expect(athlete).toEqual(mockAthlete);
    });

    it('should return null when no athlete is cached', async () => {
      mockRedis.get.mockResolvedValueOnce(null);

      const athlete = await athleteCache.getAthlete(athleteId);

      expect(mockRedis.get).toHaveBeenCalledWith(`athlete:${athleteId}`);
      expect(athlete).toBeNull();
    });
  });

  describe('setAthlete', () => {
    it('should cache the athlete and update athletes cache', async () => {
      mockAthletesCache.getAthletes.mockResolvedValueOnce([]);

      await athleteCache.setAthlete(mockAthlete);

      expect(mockRedis.set).toHaveBeenCalledWith(
        `athlete:${mockAthlete.id}`,
        JSON.stringify(mockAthlete),
        'EX',
        3600
      );
      expect(mockAthletesCache.setAthletes).toHaveBeenCalledWith([mockAthlete]);
    });

    it('should add the athlete to existing athletes cache', async () => {
      const existingAthletes = [{ ...mockAthlete, id: 'athlete2' }];
      mockAthletesCache.getAthletes.mockResolvedValueOnce(existingAthletes);

      await athleteCache.setAthlete(mockAthlete);

      expect(mockRedis.set).toHaveBeenCalledWith(
        `athlete:${mockAthlete.id}`,
        JSON.stringify(mockAthlete),
        'EX',
        3600
      );
      expect(mockAthletesCache.setAthletes).toHaveBeenCalledWith([...existingAthletes, mockAthlete]);
    });
  });

  describe('updateAthlete', () => {
    it('should update the cached athlete and update athletes cache', async () => {
      const updatedAthlete = { ...mockAthlete, name: 'Updated Name' };
      const existingAthletes = [mockAthlete];
      mockAthletesCache.getAthletes.mockResolvedValueOnce(existingAthletes);

      await athleteCache.updateAthlete(updatedAthlete);

      expect(mockRedis.set).toHaveBeenCalledWith(
        `athlete:${updatedAthlete.id}`,
        JSON.stringify(updatedAthlete),
        'EX',
        3600
      );
      expect(mockAthletesCache.setAthletes).toHaveBeenCalledWith([updatedAthlete]);
    });

    it('should replace the athlete in existing athletes cache', async () => {
      const otherAthlete = { ...mockAthlete, id: 'athlete2' };
      const existingAthletes = [mockAthlete, otherAthlete];
      const updatedAthlete = { ...mockAthlete, name: 'Updated Name' };
      mockAthletesCache.getAthletes.mockResolvedValueOnce(existingAthletes);

      await athleteCache.updateAthlete(updatedAthlete);

      expect(mockRedis.set).toHaveBeenCalledWith(
        `athlete:${updatedAthlete.id}`,
        JSON.stringify(updatedAthlete),
        'EX',
        3600
      );
      expect(mockAthletesCache.setAthletes).toHaveBeenCalledWith([updatedAthlete, otherAthlete]);
    });
  });

  describe('deleteAthlete', () => {
    it('should delete the cached athlete and update athletes and metrics cache', async () => {
      const existingAthletes = [mockAthlete];
      mockAthletesCache.getAthletes.mockResolvedValueOnce(existingAthletes);

      await athleteCache.deleteAthlete(athleteId);

      expect(mockRedis.del).toHaveBeenCalledWith(`athlete:${athleteId}`);
      expect(mockMetricCache.deleteMetrics).toHaveBeenCalledWith(athleteId);
      expect(mockAthletesCache.setAthletes).toHaveBeenCalledWith([]);
    });

    it('should remove the athlete from existing athletes cache', async () => {
      const otherAthlete = { ...mockAthlete, id: 'athlete2' };
      const existingAthletes = [mockAthlete, otherAthlete];
      mockAthletesCache.getAthletes.mockResolvedValueOnce(existingAthletes);

      await athleteCache.deleteAthlete(athleteId);

      expect(mockRedis.del).toHaveBeenCalledWith(`athlete:${athleteId}`);
      expect(mockMetricCache.deleteMetrics).toHaveBeenCalledWith(athleteId);
      expect(mockAthletesCache.setAthletes).toHaveBeenCalledWith([otherAthlete]);
    });
  });
});
