import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import BackToHomeLink from '../common/BackToHomeLink';
import { IAthleteFormValues } from '../types/IAthleteFormValues';
import { useCreateAthlete } from '../hooks/athlete/useCreateAthlete';
import AthleteForm from '../form/AthleteForm';

interface NewPageProps extends RouteComponentProps {}

const NewPageComponent: React.FC<NewPageProps> = ({ history }) => {
  const { createAthlete } = useCreateAthlete();

  const navigateToHome = useCallback(() => {
    history.push('/');
  }, [history]);

  const onSubmit = useCallback(
    (data: IAthleteFormValues) => {
      createAthlete(data);
      navigateToHome();
    },
    [createAthlete, navigateToHome]
  );

  return (
    <>
      <BackToHomeLink />
      <h1>New Athlete</h1>
      <AthleteForm onSubmit={onSubmit} />
    </>
  );
};

export const NewPage = React.memo(withRouter(NewPageComponent));
