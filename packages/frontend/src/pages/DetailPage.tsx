import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { athleteService } from '../services/athleteService';
import { Athlete } from '../types/Athlete';
import AthleteDetail from '../components/AthleteDetail';

const DetailPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();

  const {
    data: athlete,
    error,
    isLoading,
  } = useQuery<Athlete, Error>(
    ['athlete', athleteId],
    () => athleteService.getAthlete(athleteId),
    { enabled: !!athleteId }
  );

  if (isLoading) return <p>Loading athlete details...</p>;
  if (error) return <p>Error fetching athlete details</p>;
  if (!athlete) return <p>No athlete found.</p>;

  return <AthleteDetail athlete={athlete} />;
};

export { DetailPage };
