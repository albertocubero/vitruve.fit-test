import React, { useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface CreateAthleteButtonProps extends RouteComponentProps {}

const CreateAthleteButton: React.FC<CreateAthleteButtonProps> = ({
  history,
}) => {
  const navigateToCreateUser = useCallback(() => {
    history.push('/athletes/new');
  }, [history]);

  return (
    <button
      className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
      onClick={navigateToCreateUser}
    >
      Create User
    </button>
  );
};

export default withRouter(CreateAthleteButton);