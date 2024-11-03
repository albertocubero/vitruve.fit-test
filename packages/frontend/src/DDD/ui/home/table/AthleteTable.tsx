import React from 'react';
import { AthleteRow } from './AthleteTableRow';
import { IAthlete } from '../../../domain/types/IAthlete';
import AthleteTableHeaderRow from './AthleteTableHeaderRow';

interface AthleteTableProps {
  athletes: IAthlete[];
}

const AthleteTable: React.FC<AthleteTableProps> = ({ athletes }) => {
  return (
    <table>
      <thead>
        <AthleteTableHeaderRow />
      </thead>
      <tbody>
        {athletes.map((athlete) => (
          <AthleteRow key={athlete.id} athlete={athlete} />
        ))}
      </tbody>
    </table>
  );
};

export default AthleteTable;
