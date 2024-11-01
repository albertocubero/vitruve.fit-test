// src/pages/HomePage.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { athleteService } from '../services/athleteService';
import { Athlete } from '../types/Athlete';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { data: athletes, error, isLoading } = useQuery<Athlete[], Error>(
    'athletes',
    athleteService.getAthletes
  );

  if (isLoading) return <p>Loading athletes...</p>;
  if (error) return <p>Error fetching athletes</p>;

  return (
    <div>
      <h1>Athletes</h1>
      <Link to="/athlete">Create Athlete</Link>
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
          {athletes && athletes.length > 0 ? (
            athletes.map((athlete) => (
              <tr key={athlete.id}>
                <td>{athlete.name}</td>
                <td>{athlete.age}</td>
                <td>{athlete.team}</td>
                <td>
                  <Link to={`/athlete/${athlete.id}`}>Edit</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No athletes available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
