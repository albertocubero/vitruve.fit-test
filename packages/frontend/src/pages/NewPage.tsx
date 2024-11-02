import React, { useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AthleteForm, { AthleteFormValues } from '../components/form/AthleteForm';
import useCreateAthlete from '../hooks/athlete/useCreateAthlete';
import BackToHomeLink from '../components/BackToHomeLink';

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
    <div>
      <BackToHomeLink />
      <h1>New Athlete</h1>
      <AthleteForm onSubmit={onSubmit} />
    </div>
  );
};

// Componente memoizado para evitar re-renderizados innecesarios
export const NewPage = React.memo(withRouter(NewPageComponent));
