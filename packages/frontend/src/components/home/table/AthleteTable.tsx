import React from 'react';
import { AthleteRow } from './AthleteTableRow';
import { Athlete } from '../../../types/Athlete';
import AthleteTableHeaderRow from './AthleteTableHeaderRow';

interface AthleteTableProps {
  athletes: Athlete[];
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
