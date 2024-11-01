import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { athleteService } from '../services/athleteService';
import { Athlete } from '../types/Athlete';

const AthleteDetail: React.FC = () => {
  const { athleteId } = useParams<{ athleteId: string }>();

  const { data, error, isLoading } = useQuery<Athlete, Error>(
    ['athlete', athleteId],
    () => athleteService.getAthlete(athleteId)
  );

  if (isLoading) return <p>Loading athlete details...</p>;
  if (error) return <p>Error fetching athlete details</p>;
  if (!data) return <p>No athlete found.</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Age: {data.age}</p>
      <p>Team: {data.team}</p>
      <h3>Metrics</h3>
      <ul>
        {data.metrics?.map((metric) => (
          <li key={metric.id}>
            {metric.metricType}: {metric.value} {metric.unit} at {new Date(metric.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AthleteDetail;
