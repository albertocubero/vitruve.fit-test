import React from 'react';
import AthleteForm, { AthleteFormValues } from '../components/form/AthleteForm';
import useCreateAthlete from '../hooks/useCreateAthlete';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

interface NewPageProps extends RouteComponentProps {}

const NewPageComponent: React.FC<NewPageProps> = ({ history }) => {
  const { createAthlete } = useCreateAthlete();

  const onSubmit = (data: AthleteFormValues) => {
    createAthlete(data);
    history.push('/');
  };

  return (
    <div>
      <Link to={`/`}>Volver</Link>
      <h1>New Athlete</h1>
      <AthleteForm onSubmit={onSubmit} />
    </div>
  );
};

export const NewPage = withRouter(NewPageComponent);
