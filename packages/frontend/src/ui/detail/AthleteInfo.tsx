import React from 'react';
import { IAthlete } from '../../../domain/types/IAthlete';

interface AthleteInfoProps {
  athlete: IAthlete;
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({ athlete }) => (
  <>
    <h2>Name: {athlete.name}</h2>
    <p>Age: {athlete.age}</p>
    <p>Team: {athlete.team}</p>
  </>
);

export default AthleteInfo;
