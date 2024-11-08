import { serve } from '@hono/node-server';
import { createAthleteUseCase } from '../../../../../src/api/v1/application/usecases/athletes/CreateAthleteUseCase';
import { getAllAthletesUseCase } from '../../../../../src/api/v1/application/usecases/athletes/GetAllAthletesUseCase';
import { getAthleteUseCase } from '../../../../../src/api/v1/application/usecases/athletes/GetAthleteUseCase';
import { updateAthleteUseCase } from '../../../../../src/api/v1/application/usecases/athletes/UpdateAthleteUseCase';
import { deleteAthleteUseCase } from '../../../../../src/api/v1/application/usecases/athletes/DeleteAthleteUseCase';
import { app } from './testServer';

jest.mock(
  '../../../../../src/api/v1/application/usecases/athletes/CreateAthleteUseCase'
);
jest.mock(
  '../../../../../src/api/v1/application/usecases/athletes/GetAllAthletesUseCase'
);
jest.mock(
  '../../../../../src/api/v1/application/usecases/athletes/GetAthleteUseCase'
);
jest.mock(
  '../../../../../src/api/v1/application/usecases/athletes/UpdateAthleteUseCase'
);
jest.mock(
  '../../../../../src/api/v1/application/usecases/athletes/DeleteAthleteUseCase'
);

jest.mock('../../../../../src/utils/logger');
jest.mock(
  '../../../../../src/api/v1/infrastructure/routes/validation/athleteIdValidation',
  () => ({
    validateAthleteId: jest.fn().mockImplementation((c, next) => next()),
  })
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

  beforeAll(async () => {
    appServer = await serve({
      fetch: app.fetch,
      port: 0,
    });
  });

  afterAll((done) => {
    if (appServer) {
      appServer.close(done);
    }
  });

  describe('GET /', () => {
    it('should return a list of athletes', async () => {
      const athletes = [athleteData];
      jest.spyOn(getAllAthletesUseCase, 'execute').mockResolvedValue(athletes);

      const response = await app.request('/api/v1/athletes');

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual(athletes);
    });

    it('should return an error when retrieving athletes fails', async () => {
      const errorMessage = 'Failed to retrieve athletes';
      jest
        .spyOn(getAllAthletesUseCase, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      const response = await app.request('/api/v1/athletes');

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.details).toEqual(errorMessage);
    });
  });

  describe('POST /', () => {
    it('should create a new athlete', async () => {
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
    });

    it('should return an error when creating an athlete fails', async () => {
      const errorMessage = 'Failed to create athlete';
      jest
        .spyOn(createAthleteUseCase, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      const response = await app.request('/api/v1/athletes', {
        method: 'POST',
        body: JSON.stringify(athleteData),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.details).toEqual(errorMessage);
    });
  });

  describe('GET /:athleteId', () => {
    it('should return an athlete by ID', async () => {
      jest.spyOn(getAthleteUseCase, 'execute').mockResolvedValue(athleteData);

      const response = await app.request(`/api/v1/athletes/${athleteId}`);

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual(athleteData);
    });

    it('should return an error if the athlete is not found', async () => {
      jest.spyOn(getAthleteUseCase, 'execute').mockResolvedValue(null);

      const response = await app.request(`/api/v1/athletes/${athleteId}`);

      expect(response.status).toBe(404);
      const body = await response.json();
      expect(body.message).toEqual('Athlete not found');
    });

    it('should return an error when retrieving athlete fails', async () => {
      const errorMessage = 'Failed to retrieve athlete';
      jest
        .spyOn(getAthleteUseCase, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      const response = await app.request(`/api/v1/athletes/${athleteId}`);

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.details).toEqual(errorMessage);
    });
  });

  describe('PUT /:athleteId', () => {
    it('should update an athlete', async () => {
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
    });

    it('should return an error when updating athlete fails', async () => {
      const errorMessage = 'Failed to update athlete';
      jest
        .spyOn(updateAthleteUseCase, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      const response = await app.request(`/api/v1/athletes/${athleteId}`, {
        method: 'PUT',
        body: JSON.stringify(athleteData),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.details).toEqual(errorMessage);
    });
  });

  describe('DELETE /:athleteId', () => {
    it('should delete an athlete', async () => {
      jest.spyOn(deleteAthleteUseCase, 'execute').mockResolvedValue(undefined);

      const response = await app.request(`/api/v1/athletes/${athleteId}`, {
        method: 'DELETE',
      });

      expect(response.status).toBe(200);
    });

    it('should return an error when deleting athlete fails', async () => {
      const errorMessage = 'Failed to delete athlete';
      jest
        .spyOn(deleteAthleteUseCase, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      const response = await app.request(`/api/v1/athletes/${athleteId}`, {
        method: 'DELETE',
      });

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.details).toEqual(errorMessage);
    });
  });
});
