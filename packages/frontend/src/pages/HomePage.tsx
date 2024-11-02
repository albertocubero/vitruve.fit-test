import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import AthleteTable from '../components/home/AthleteTable';
import { useGetAthletes } from '../hooks/athlete/useGetAthletes';
import { useDeleteAthlete } from '../hooks/athlete/useDeleteAthlete';

const HomePage: React.FC = () => {
  const { data, error: athleteError, isLoading: isAthleteLoading } = useGetAthletes();
  const deleteAthleteMutation = useDeleteAthlete();

  const handleDelete = useCallback((athleteId: string) => {
    deleteAthleteMutation.mutate(athleteId);
  }, [deleteAthleteMutation]);

  return (
    <div>
      <h1>Athletes</h1>
      <Link to="/athletes/new">
        <button>Add New Athlete</button>
      </Link>
      <AthleteTable 
        athletes={data} 
        errorMessage={athleteError?.message} 
        isLoading={isAthleteLoading} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export { HomePage };
