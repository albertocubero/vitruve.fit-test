import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface BackButtonProps extends RouteComponentProps {};

const BackButton: React.FC<BackButtonProps> = ({ history }) => {
    const navigateToHome = useCallback(() => {
        history.push(`/`);
      }, [history]);

  return (
    <button
      type="button"
      className="flex items-center text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
      onClick={navigateToHome}
    >
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="text-sm">Go Back</span>
    </button>
  );
};

export default withRouter(BackButton);
