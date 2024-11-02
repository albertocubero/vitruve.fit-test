import React from 'react';
import { AthleteRow } from './AthleteTableRow';
import AthleteTableHeaderRow from './AthleteTableHeaderRow';
import { Athlete } from '../../types/Athlete';

interface AthleteTableProps {
  athletes: Athlete[] | undefined;
}

const AthleteTable: React.FC<AthleteTableProps> = ({ athletes }) => {
  return (
    <div>
      <table>
        <thead>
          <AthleteTableHeaderRow />
        </thead>
        <tbody>
          {athletes?.map((athlete) => (
            <AthleteRow key={athlete.id} athlete={athlete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AthleteTable;
