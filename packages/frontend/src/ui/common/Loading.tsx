import React, { useEffect, useState } from 'react';

const Loading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="mt-32 flex justify-center items-center w-full">
      <div
        data-testid="loading-spinner"
        className="relative flex justify-center items-center w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
      >
        <div className="absolute w-full h-full rounded-full border-4 border-t-4 border-blue-500 border-solid"></div>
      </div>
    </div>
  );
};

export default React.memo(Loading);
