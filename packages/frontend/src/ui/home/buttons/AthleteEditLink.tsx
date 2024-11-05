import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface AthleteEditLinkProps extends RouteComponentProps {
  athleteId: string;
}

const AthleteEditLink: React.FC<AthleteEditLinkProps> = ({
  athleteId,
  history,
}) => {
  const navigateToEditUser = useCallback(() => {
    history.push(`/athletes/edit/${athleteId}`);
  }, [history, athleteId]);

  return (
    <button
      className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
      onClick={navigateToEditUser}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        ></path>
      </svg>
    </button>
  );
};

export default withRouter(AthleteEditLink);
