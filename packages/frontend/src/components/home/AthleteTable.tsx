import React from 'react';
import { AthleteRow } from './AthleteTableRow';
import AthleteTableHeaderRow from './AthleteTableHeaderRow';
import LoadingErrorMessage from '../LoadingErrorMessage';
import { Athlete } from '../../types/Athlete';

interface AthleteTableProps {
  athletes: Athlete[] | undefined;
  errorMessage: string | undefined;
  isLoading: boolean;
  onDelete: (athleteId: string) => void;
}

const AthleteTable: React.FC<AthleteTableProps> = ({ athletes, errorMessage, isLoading, onDelete }) => {
  return (
    <div>
      <LoadingErrorMessage isLoading={isLoading} error={errorMessage} />
      <table>
        <thead>
          <AthleteTableHeaderRow />
        </thead>
        <tbody>
          {athletes?.map((athlete) => (
            <AthleteRow key={athlete.id} athlete={athlete} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AthleteTable;
