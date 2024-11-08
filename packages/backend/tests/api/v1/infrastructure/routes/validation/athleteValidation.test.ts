import { Context, Next } from 'hono';
import {
  validateCreateAthleteParams,
  validateUpdateAthlete,
} from '../../../../../../src/api/v1/infrastructure/routes/validation/athleteValidation';
import { validateAthleteId } from '../../../../../../src/api/v1/infrastructure/routes/validation/athleteIdValidation';
import { errorResponse } from '../../../../../../src/utils/errorResponse';

jest.mock('../../../../../../src/utils/logger');
jest.mock(
  '../../../../../../src/api/v1/infrastructure/routes/validation/athleteIdValidation',
  () => ({
    validateAthleteId: jest.fn().mockImplementation((c, next) => next()),
  })
);

const mockNext: Next = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn();
const mockReq = { json: jest.fn() };

describe('Athlete Validation Middleware', () => {
  let context: Context;

  beforeEach(() => {
    jest.clearAllMocks();

    context = {
      req: mockReq,
      json: mockJson,
      status: mockStatus,
    } as unknown as Context;
  });

  describe('validateCreateAthleteParams', () => {
    it('should proceed if athlete data is valid', async () => {
      mockReq.json.mockResolvedValue({
        name: 'John Doe',
        age: 25,
        team: 'Team A',
      });

      await validateCreateAthleteParams(context, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 400 if name is missing', async () => {
      mockReq.json.mockResolvedValue({ age: 25, team: 'Team A' });

      await validateCreateAthleteParams(context, mockNext);

      expect(mockJson).toHaveBeenCalledWith(
        errorResponse(400, '[ATHLETES] Invalid data', [
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            path: ['name'],
            message: 'Required',
          },
        ]),
        400
      );
    });

    it('should return 400 if age is negative', async () => {
      mockReq.json.mockResolvedValue({
        name: 'John Doe',
        age: -5,
        team: 'Team A',
      });

      await validateCreateAthleteParams(context, mockNext);

      expect(mockJson).toHaveBeenCalledWith(
        errorResponse(400, '[ATHLETES] Invalid data', [
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            path: ['name'],
            message: 'Required',
          },
        ]),
        400
      );
    });

    it('should return 500 if there is an error parsing request data', async () => {
      mockReq.json.mockRejectedValue(new Error('Parse error'));

      await validateCreateAthleteParams(context, mockNext);

      expect(mockJson).toHaveBeenCalledWith(
        errorResponse(
          500,
          '[ATHLETES] Failed to validate athlete data',
          'Parse error'
        ),
        500
      );
    });
  });

  describe('validateUpdateAthlete', () => {
    it('should proceed if athleteId and partial athlete data are valid', async () => {
      mockReq.json.mockResolvedValue({ team: 'Updated Team' });
      (validateAthleteId as jest.Mock).mockImplementation((c, next) => next());

      await validateUpdateAthlete(context, mockNext);

      expect(validateAthleteId).toHaveBeenCalledWith(
        context,
        expect.any(Function)
      );
      expect(mockNext).toHaveBeenCalled();
    });

    it('should return error if athleteId validation fails', async () => {
      (validateAthleteId as jest.Mock).mockImplementation(() =>
        context.json(errorResponse(404, 'Athlete not found'), 404)
      );

      const result = await validateUpdateAthlete(context, mockNext);

      expect(validateAthleteId).toHaveBeenCalled();
      expect(result).toEqual(
        context.json(errorResponse(404, 'Athlete not found'), 404)
      );
    });

    it('should return 400 if partial athlete data is invalid', async () => {
      mockReq.json.mockResolvedValue({ age: -1 });
      (validateAthleteId as jest.Mock).mockImplementation((c, next) => next());

      await validateUpdateAthlete(context, mockNext);

      expect(mockJson).toHaveBeenCalledWith(
        errorResponse(400, '[ATHLETES] Invalid data', [
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            path: ['age'],
            message: 'Required',
          },
        ]),
        400
      );
    });

    it('should return 500 if there is an error parsing update request data', async () => {
      mockReq.json.mockRejectedValue(new Error('Parse error'));
      (validateAthleteId as jest.Mock).mockImplementation((c, next) => next());

      await validateUpdateAthlete(context, mockNext);

      expect(mockJson).toHaveBeenCalledWith(
        errorResponse(
          500,
          '[ATHLETES] Failed to validate athlete data',
          'Parse error'
        ),
        500
      );
    });
  });
});
