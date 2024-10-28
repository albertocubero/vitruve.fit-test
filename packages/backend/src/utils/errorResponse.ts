interface ErrorResponse {
  status: number;
  message: string;
  details?: any; // Para incluir detalles opcionales sobre el error
}

export const errorResponse = (
  status: number,
  message: string,
  details?: any
): ErrorResponse => ({
  status,
  message,
  details,
});
