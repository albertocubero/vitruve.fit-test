import React, { useEffect, useState } from 'react';

interface SuccessCardProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessCardProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setOpacity(1);
    }, 0);

    const fadeOutTimer = setTimeout(() => {
      setOpacity(0);
    }, 5000);

    const visibilityTimer = setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(visibilityTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 transition-opacity duration-1000`}
      style={{ opacity }}
    >
      <div className="flex items-center justify-center w-12 bg-emerald-500">
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
          <p className="text-sm text-gray-600 dark:text-gray-200">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;