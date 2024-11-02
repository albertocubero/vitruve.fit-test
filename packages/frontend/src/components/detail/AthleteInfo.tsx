import React from 'react';
import { Athlete } from '../../types/Athlete';

interface AthleteInfoProps {
  athlete: Athlete;
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({ athlete }) => (
  <div>
    <h2>{athlete.name}</h2>
    <p>Age: {athlete.age}</p>
    <p>Team: {athlete.team}</p>
  </div>
);

export default AthleteInfo;
