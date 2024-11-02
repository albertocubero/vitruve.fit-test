import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Athlete } from '../types/Athlete';
import MetricsSection from '../components/edit/MetricsSection';
import AthleteForm from '../components/form/AthleteForm';
import { useAthlete } from '../hooks/useAthlete';
import LoadingErrorMessage from '../components/LoadingErrorMessage';
import useEditAthlete from '../hooks/useEditAthlete'; // Importa el nuevo hook

const EditPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();
  const { data: athlete, error: athleteError, isLoading: isAthleteLoading } = useAthlete(athleteId);
  const { editAthlete } = useEditAthlete(athleteId);

  const onSubmit = (data: Athlete) => {
    editAthlete(data);
  };

  return (
    <div>
      <Link to={`/`}>Volver</Link>
      <h1>Edit Athlete</h1>
      <LoadingErrorMessage isLoading={isAthleteLoading} error={athleteError?.message} />
      <AthleteForm athlete={athlete} onSubmit={onSubmit} />
      <MetricsSection athleteId={athleteId} />
    </div>
  );
};

export { EditPage };
