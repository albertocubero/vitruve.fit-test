import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { athleteService } from '../services/athleteService';
import { Athlete } from '../types/Athlete';
import { Link } from 'react-router-dom';

const AthleteTable: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery<Athlete[], Error>('athletes', athleteService.getAthletes);

  const mutation = useMutation(athleteService.deleteAthlete, {
    onSuccess: () => {
      queryClient.invalidateQueries('athletes');
    },
  });

  const handleDelete = (athleteId: any) => {
    if (window.confirm("Are you sure you want to delete this athlete?")) {
      mutation.mutate(athleteId);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching athletes</p>;

  return (
    <div>
      <h1>Athletes</h1>
      <Link to="/athletes/new">
        <button>Add New Athlete</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((athlete) => (
              <tr key={athlete.id}>
                <td>{athlete.name}</td>
                <td>{athlete.age}</td>
                <td>{athlete.team}</td>
                <td>
                  <Link to={`/athletes/${athlete.id}`}>View</Link>
                  <Link to={`/athletes/edit/${athlete.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(athlete.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AthleteTable;
