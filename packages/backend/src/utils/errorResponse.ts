interface ErrorResponse {
  status: number;
  message: string;
  details?: any;
}

const getErrorDetailsMessage = (error?: unknown): string => {
  return error instanceof Error ? error.message : String(error);
};

export const errorResponse = (
  status: number,
  message: string,
  error?: unknown
): ErrorResponse => {
  const details = getErrorDetailsMessage(error);

  return {
    status,
    message,
    details,
  };
};

export const errorLogMessage = (message: string, error?: unknown): string => {
  const details = getErrorDetailsMessage(error);
  return `${message}: ${details}`;
};
