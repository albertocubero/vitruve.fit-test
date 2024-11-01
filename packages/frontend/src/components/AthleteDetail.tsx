import React from 'react';
import { Athlete } from '../types/Athlete';

export interface AthleteFormValues {
  name: string;
  age: number;
  team: string;
}

interface AthleteFormProps {
  athlete: Athlete;
}

const AthleteDetail: React.FC<AthleteFormProps> = ({ athlete }) => {
  return (
    <div>
      <h2>{athlete.name}</h2>
      <p>Age: {athlete.age}</p>
      <p>Team: {athlete.team}</p>
      <h3>Metrics</h3>
      <ul>
        {athlete.metrics?.map((metric) => (
          <li key={metric.id}>
            {metric.metricType}: {metric.value} {metric.unit} at{' '}
            {new Date(metric.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AthleteDetail;
