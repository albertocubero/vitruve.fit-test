import React from 'react';
import { Athlete } from '../../../types/Athlete';

interface AthleteInfoProps {
  athlete: Athlete;
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({ athlete }) => {
  return (
    <>
      <td>{athlete.name}</td>
      <td>{athlete.age}</td>
      <td>{athlete.team}</td>
    </>
  );
};

export default AthleteInfo;
