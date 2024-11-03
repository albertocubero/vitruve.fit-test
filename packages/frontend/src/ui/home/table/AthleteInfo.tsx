import React from 'react';
import { IAthlete } from '../../../../domain/types/IAthlete';

interface AthleteInfoProps {
  athlete: IAthlete;
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
