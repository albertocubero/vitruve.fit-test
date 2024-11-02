import React from 'react';

interface LoadingErrorMessageProps {
  isLoading: boolean;
  error: string | undefined;
}

const LoadingErrorMessage: React.FC<LoadingErrorMessageProps> = ({ isLoading, error }) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  return null;
};

export default LoadingErrorMessage;
