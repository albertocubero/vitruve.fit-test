import React from 'react';
import { useParams } from 'react-router-dom';
import AthleteDetail from '../components/AthleteDetail';
import AthleteForm from '../components/AthleteForm';
import { useQuery } from 'react-query';
import { athleteService } from '../services/athleteService';
import { Athlete } from '../types/Athlete';

const AthletePage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();
  
  const { data: athlete, error, isLoading } = useQuery<Athlete, Error>(
    ['athlete', athleteId],
    () => athleteService.getAthlete(athleteId!),
    { enabled: !!athleteId }
  );

  if (isLoading) return <p>Loading athlete...</p>;
  if (error) return <p>Error fetching athlete</p>;

  return (
    <div>
      <h1>{athleteId ? 'Edit Athlete' : 'Create Athlete'}</h1>
      <AthleteForm athlete={athlete} />
      {athleteId && athlete && <AthleteDetail athleteId={athleteId} />} {/* Aseguramos que athleteId sea un string */}
    </div>
  );
};

export default AthletePage;
