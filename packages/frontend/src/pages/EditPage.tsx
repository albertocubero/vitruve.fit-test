import React from 'react';
import { useParams } from 'react-router-dom';
import AthleteForm from '../components/AthleteForm';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { athleteService } from '../services/athleteService';
import { Athlete } from '../types/Athlete';
import MetricsSection from '../components/edit/MetricsSection';

const EditPage: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();
  const queryClient = useQueryClient();

  const {
    data: athlete,
    error,
    isLoading,
  } = useQuery<Athlete, Error>(
    ['athlete', athleteId],
    () => athleteService.getAthlete(athleteId as string),
    { enabled: !!athleteId }
  );

  const mutation = useMutation(athleteService.saveAthlete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['athlete', athleteId]);
    },
  });

  const onSubmit = (data: Athlete) => {
    const athleteData: Athlete = {
      ...data,
      id: athleteId!,
    };
    mutation.mutate(athleteData);
  };

  if (isLoading) return <p>Loading athlete...</p>;
  if (error) return <p>Error loading athlete</p>;
  if (!athleteId) return <p>Error athlete Id not provided</p>;

  return (
    <div>
      <h1>Edit Athlete</h1>
      <AthleteForm athlete={athlete} onSubmit={onSubmit} />
      <MetricsSection athleteId={athleteId} />
    </div>
  );
};

export { EditPage };
