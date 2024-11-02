import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AthleteForm from '../components/form/AthleteForm';
import BackToHomeLink from '../components/BackToHomeLink';
import { useCreateAthlete } from '../hooks/athlete/useCreateAthlete';
import { AthleteFormValues } from '../types/AthleteFormValues';

interface NewPageProps extends RouteComponentProps {}

const NewPageComponent: React.FC<NewPageProps> = ({ history }) => {
  const { createAthlete } = useCreateAthlete();

  const navigateToHome = useCallback(() => {
    history.push('/');
  }, [history]);

  const onSubmit = useCallback(
    (data: AthleteFormValues) => {
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
