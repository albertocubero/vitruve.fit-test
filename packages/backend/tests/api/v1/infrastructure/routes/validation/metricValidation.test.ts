import { Context } from 'hono';
import { validateAddMetricParams } from '../../../../../../src/api/v1/infrastructure/routes/validation/metricValidation';
import { errorResponse } from '../../../../../../src/utils/errorResponse';
import logger from '../../../../../../src/utils/logger';

jest.mock('../../../../../../src/utils/logger');

describe('validateAddMetricParams', () => {
  const mockNext = jest.fn();
  let mockContext: Context;

  beforeEach(() => {
    mockContext = {
      req: {
        json: jest.fn(),
      },
      json: jest.fn(),
    } as unknown as Context;
    jest.clearAllMocks();
  });

  it('should call next when valid metric data is provided', async () => {
    const validData = { metricType: 'speed', value: 5, unit: 'm/s' };
    (mockContext.req.json as jest.Mock).mockResolvedValue(validData);

    await validateAddMetricParams(mockContext, mockNext);

    expect(mockContext.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 400 with an error response when invalid metric data is provided', async () => {
    const invalidData = { metricType: 'speed', value: -5, unit: 'm/s' };
    (mockContext.req.json as jest.Mock).mockResolvedValue(invalidData);

    await validateAddMetricParams(mockContext, mockNext);

    expect(mockContext.json).toHaveBeenCalledWith(
      errorResponse(400, '[ADD METRIC] Invalid params provided', [
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['value'],
          message: 'Required',
        },
      ]),
      400
    );
    expect(mockNext).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('[ADD METRIC] Invalid params provided')
    );
  });

  it('should return 400 when required fields are missing', async () => {
    const invalidData = { value: 5 };
    (mockContext.req.json as jest.Mock).mockResolvedValue(invalidData);

    await validateAddMetricParams(mockContext, mockNext);

    expect(mockContext.json).toHaveBeenCalledWith(
      errorResponse(400, '[ADD METRIC] Invalid params provided', [
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['metricType'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['unit'],
          message: 'Required',
        },
      ]),
      400
    );
    expect(mockNext).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('[ADD METRIC] Invalid params provided')
    );
  });

  it('should return 500 when an unexpected error occurs', async () => {
    const errorMessage = 'Unexpected error';
    (mockContext.req.json as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await validateAddMetricParams(mockContext, mockNext);

    expect(mockContext.json).toHaveBeenCalledWith(
      errorResponse(
        500,
        'Failed to validate metric schema',
        'Unexpected error'
      ),
      500
    );
    expect(mockNext).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Failed to validate metric schema')
    );
  });
});
