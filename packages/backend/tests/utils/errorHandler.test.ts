import { errorResponse, errorLogMessage } from '../../src/utils/errorResponse';

describe('Error Handler', () => {
  describe('errorResponse', () => {
    it('should return an ErrorResponse without details when no error is provided', () => {
      const status = 400;
      const message = 'Bad Request';
      const response = errorResponse(status, message);

      expect(response.status).toBe(status);
      expect(response.message).toBe(message);
      expect(response.details).toBeUndefined();
    });

    it('should return an ErrorResponse with details when an error is provided', () => {
      const status = 500;
      const message = 'Internal Server Error';
      const error = new Error('Database connection failed');
      const response = errorResponse(status, message, error);

      expect(response.status).toBe(status);
      expect(response.message).toBe(message);
      expect(response.details).toBe('Database connection failed');
    });

    it('should return an ErrorResponse with details when a non-Error object is provided', () => {
      const status = 400;
      const message = 'Invalid input';
      const error = 'Invalid parameter';
      const response = errorResponse(status, message, error);

      expect(response.status).toBe(status);
      expect(response.message).toBe(message);
      expect(response.details).toBe('Invalid parameter');
    });
  });

  describe('errorLogMessage', () => {
    it('should return a log message with details when an error is provided', () => {
      const message = 'Something went wrong';
      const error = new Error('Database connection failed');
      const logMessage = errorLogMessage(message, error);

      expect(logMessage).toBe('Something went wrong: Database connection failed');
    });

    it('should return a log message with details when a non-Error object is provided', () => {
      const message = 'Invalid input';
      const error = 'Invalid parameter';
      const logMessage = errorLogMessage(message, error);

      expect(logMessage).toBe('Invalid input: Invalid parameter');
    });

    it('should return undefined when no error details are provided', () => {
      const message = 'No error';
      const logMessage = errorLogMessage(message);

      expect(logMessage).toBeUndefined();
    });
  });
});
