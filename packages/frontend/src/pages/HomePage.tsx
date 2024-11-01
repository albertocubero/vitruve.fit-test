import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteAthlete } from '../hooks/useDeleteAthlete';
import { AthleteRow } from '../components/home/AthleteTableRow';
import { useAthletes } from '../hooks/useAthletes';
import AthleteTableHeaderRow from '../components/home/AthleteTableHeaderRow';

const HomePage: React.FC = () => {
  const { data, error, isLoading } = useAthletes();
  const deleteAthleteMutation = useDeleteAthlete();

  const handleDelete = (athleteId: string) => {
    deleteAthleteMutation.mutate(athleteId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching athletes</p>;

  return (
    <div>
      <h1>Athletes</h1>
      {deleteAthleteMutation.isError && <p>Error deleting athlete.</p>}
      <Link to="/athletes/new">
        <button>Add New Athlete</button>
      </Link>
      <table>
        <thead>
          <AthleteTableHeaderRow />
        </thead>
        <tbody>
          {data?.map((athlete) => (
            <AthleteRow key={athlete.id} athlete={athlete} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { HomePage };
