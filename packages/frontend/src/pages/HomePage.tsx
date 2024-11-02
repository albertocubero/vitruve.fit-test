import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteAthlete } from '../hooks/useDeleteAthlete';
import { useAthletes } from '../hooks/useAthletes';
import AthleteTable from '../components/home/AthleteTable';

const HomePage: React.FC = () => {
  const { data, error: athleteError, isLoading: isAthleteLoading } = useAthletes();
  const deleteAthleteMutation = useDeleteAthlete();

  const handleDelete = (athleteId: string) => {
    deleteAthleteMutation.mutate(athleteId);
  };

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
