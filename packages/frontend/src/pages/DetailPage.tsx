import React from 'react';
import { useParams } from 'react-router-dom';
import { useAthlete } from '../hooks/useAthlete';
import AthleteDetail from '../components/detail/AthleteDetail';

const DetailPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();

  const {
    data: athlete,
    error,
    isLoading,
  } = useAthlete(athleteId);

  if (isLoading) return <p>Loading athlete details...</p>;
  if (error) return <p>Error fetching athlete details</p>;
  if (!athlete) return <p>No athlete found.</p>;

  return <AthleteDetail athlete={athlete} />;
};

export { DetailPage };
