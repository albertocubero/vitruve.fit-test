import { serve } from '@hono/node-server';
import { createAthleteUseCase } from '../../../../../src/api/v1/application/usecases/athletes/CreateAthleteUseCase';
import { getAllAthletesUseCase } from '../../../../../src/api/v1/application/usecases/athletes/GetAllAthletesUseCase';
import { getAthleteUseCase } from '../../../../../src/api/v1/application/usecases/athletes/GetAthleteUseCase';
import { updateAthleteUseCase } from '../../../../../src/api/v1/application/usecases/athletes/UpdateAthleteUseCase';
import { deleteAthleteUseCase } from '../../../../../src/api/v1/application/usecases/athletes/DeleteAthleteUseCase';
import athletesCacheFactory from '../../../../../src/api/v1/infrastructure/repositories/cache/athletesCache';
import athleteCacheFactory from '../../../../../src/api/v1/infrastructure/repositories/cache/athleteCache';
import { app } from './testServer';

jest.mock('../../../../../src/api/v1/application/usecases/athletes/CreateAthleteUseCase');
jest.mock('../../../../../src/api/v1/application/usecases/athletes/GetAllAthletesUseCase');
jest.mock('../../../../../src/api/v1/application/usecases/athletes/GetAthleteUseCase');
jest.mock('../../../../../src/api/v1/application/usecases/athletes/UpdateAthleteUseCase');
jest.mock('../../../../../src/api/v1/application/usecases/athletes/DeleteAthleteUseCase');
jest.mock('../../../../../src/utils/logger');
jest.mock('../../../../../src/api/v1/infrastructure/repositories/cache/athletesCache');
jest.mock('../../../../../src/api/v1/infrastructure/repositories/cache/athleteCache');
jest.mock(
  '../../../../../src/api/v1/infrastructure/routes/validation/athleteIdValidation',
  () => ({ validateAthleteId: jest.fn().mockImplementation((c, next) => next()) })
);


describe('athleteController', () => {
  const athleteId = '123';
  const athleteData = {
    id: athleteId,
    name: 'John Doe',
    age: 25,
    team: 'Team A',
  };

  let appServer: any;
  let mockAthletesCache: any;
  let mockAthleteCache: any;

  beforeAll(async () => {
    appServer = await serve({
      fetch: app.fetch,
      port: 0,
    });
  });

  beforeEach(() => {
    mockAthletesCache = {
      getAthletes: jest.fn(),
      setAthletes: jest.fn(),
    };
    (athletesCacheFactory as jest.Mock).mockReturnValue(mockAthletesCache);

    mockAthleteCache = {
      getAthlete: jest.fn(),
      setAthlete: jest.fn(),
      updateAthlete: jest.fn(),
      deleteAthlete: jest.fn(),
    };
    (athleteCacheFactory as jest.Mock).mockReturnValue(mockAthleteCache);
    
  });

  afterAll((done) => {
    if (appServer) {
      appServer.close(done);
    }
  });

  describe('GET /', () => {
    it('should return a list of athletes from cache', async () => {
      const athletes = [athleteData];
      mockAthletesCache.getAthletes.mockResolvedValue(athletes);

      const response = await app.request('/api/v1/athletes');
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual(athletes);
    });

    it('should retrieve athletes from use case and cache them if not in cache', async () => {
      const athletes = [athleteData];
      mockAthletesCache.getAthletes.mockResolvedValue(null);
      jest.spyOn(getAllAthletesUseCase, 'execute').mockResolvedValue(athletes);

      const response = await app.request('/api/v1/athletes');
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual(athletes);
      expect(mockAthletesCache.setAthletes).toHaveBeenCalledWith(athletes);
    });
  });

  describe('POST /', () => {
    it('should create a new athlete and cache it', async () => {
      const newAthlete = { ...athleteData, id: 'new-id' };
      jest.spyOn(createAthleteUseCase, 'execute').mockResolvedValue(newAthlete);

      const response = await app.request('/api/v1/athletes', {
        method: 'POST',
        body: JSON.stringify(athleteData),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(201);
      const body = await response.json();
      expect(body).toEqual(newAthlete);
      expect(mockAthleteCache.setAthlete).toHaveBeenCalledWith(newAthlete);
    });
  });

  describe('GET /:athleteId', () => {
    it('should return an athlete from cache if available', async () => {
      mockAthleteCache.getAthlete.mockResolvedValue(athleteData);

      const response = await app.request(`/api/v1/athletes/${athleteId}`);
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual(athleteData);
    });

    it('should retrieve and cache an athlete if not in cache', async () => {
      mockAthleteCache.getAthlete.mockResolvedValue(null);
      jest.spyOn(getAthleteUseCase, 'execute').mockResolvedValue(athleteData);

      const response = await app.request(`/api/v1/athletes/${athleteId}`);
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual(athleteData);
      expect(mockAthleteCache.setAthlete).toHaveBeenCalledWith(athleteData);
    });

    it('should return 404 if athlete is not found', async () => {
      mockAthleteCache.getAthlete.mockResolvedValue(null);
      jest.spyOn(getAthleteUseCase, 'execute').mockResolvedValue(null);

      const response = await app.request(`/api/v1/athletes/${athleteId}`);
      expect(response.status).toBe(404);
      const body = await response.json();
      expect(body).toEqual({
        message: 'Athlete not found',
        status: 404,
      });
    });
  });

  describe('PUT /:athleteId', () => {
    it('should update an athlete and cache the updated data', async () => {
      const updatedAthlete = { ...athleteData, name: 'John Updated' };
      jest
        .spyOn(updateAthleteUseCase, 'execute')
        .mockResolvedValue(updatedAthlete);

      const response = await app.request(`/api/v1/athletes/${athleteId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedAthlete),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual(updatedAthlete);
      expect(mockAthleteCache.updateAthlete).toHaveBeenCalledWith(updatedAthlete);
    });
  });

  describe('DELETE /:athleteId', () => {
    it('should delete an athlete and remove it from cache', async () => {
      jest.spyOn(deleteAthleteUseCase, 'execute').mockResolvedValue(undefined);

      const response = await app.request(`/api/v1/athletes/${athleteId}`, {
        method: 'DELETE',
      });

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.message).toBe(`[ATHLETES] Athlete with id ${athleteId} deleted successfully.`);
      expect(mockAthleteCache.deleteAthlete).toHaveBeenCalledWith(athleteId);
    });
  });
});
