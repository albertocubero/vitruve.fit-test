import { Context, Next } from 'hono';
import { validateAthleteId } from '../../../../../../src/api/v1/infrastructure/routes/validation/athleteIdValidation';
import { athleteRepository } from '../../../../../../src/api/v1/infrastructure/repositories/AthleteRepository';
import { errorResponse } from '../../../../../../src/utils/errorResponse';

jest.mock('../../../../../../src/utils/errorResponse');
jest.mock('../../../../../../src/api/v1/infrastructure/repositories/AthleteRepository');
jest.mock('../../../../../../src/utils/logger');

const mockNext: Next = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn();
const mockReq = { param: jest.fn() };

describe('validateAthleteId middleware', () => {
  let context: Context;

  beforeEach(() => {
    jest.clearAllMocks();

    context = {
      req: mockReq,
      json: mockJson,
      status: mockStatus,
    } as unknown as Context;
  });

  it('should proceed if athleteId is valid and athlete exists', async () => {
    mockReq.param.mockReturnValue({ athleteId: '123' });
    athleteRepository.exists = jest.fn().mockResolvedValue(true);

    await validateAthleteId(context, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 400 if athleteId is invalid', async () => {
    mockReq.param.mockReturnValue({ athleteId: '' });

    await validateAthleteId(context, mockNext);

    expect(mockJson).toHaveBeenCalledWith(
      errorResponse(400, 'Invalid Athlete with ID: Athlete ID is required'),
      400
    );
  });

  it('should return 404 if athlete does not exist', async () => {
    mockReq.param.mockReturnValue({ athleteId: '123' });
    athleteRepository.exists = jest.fn().mockResolvedValue(false);

    await validateAthleteId(context, mockNext);

    expect(mockJson).toHaveBeenCalledWith(
      errorResponse(404, 'Athlete with ID [123] does not exist.'),
      404
    );
  });

  it('should return 500 if there is an internal error', async () => {
    mockReq.param.mockReturnValue({ athleteId: '123' });
    athleteRepository.exists = jest.fn().mockRejectedValue(new Error('Internal Error'));

    await validateAthleteId(context, mockNext);

    expect(mockJson).toHaveBeenCalledWith(
      errorResponse(500, 'Failed to validate Athlete with ID', new Error('Internal Error')),
      500
    );
  });
});
