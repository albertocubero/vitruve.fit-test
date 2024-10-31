interface ErrorResponse {
  status: number;
  message: string;
  details?: any;
}

export const errorResponse = (
  status: number,
  message: string,
  error?: unknown
): ErrorResponse => {
  const details = getErrorDetailsMessage(error);

  const response: ErrorResponse = {
    status,
    message,
  };

  if (details) {
    response.details = details;
  }

  return response;
};

export const errorLogMessage = (message: string, error?: unknown): string | undefined => {
  const details = getErrorDetailsMessage(error);

  if (details) {
    return `${message}: ${details}`;
  }

  return;
};

const getErrorDetailsMessage = (error?: unknown): string | undefined => {
  return error ? (error instanceof Error ? error.message : String(error)) : undefined;
};
