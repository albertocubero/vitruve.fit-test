import React from 'react';
import { render, screen } from '@testing-library/react';
import AthleteTable from '../../../../src/ui/home/table/AthleteTable';
import { IAthlete } from '../../../../src/domain/types/IAthlete';

jest.mock('../../../../src/ui/home/table/AthleteTableHeaderRow', () => () => (
  <div>Athlete Table Header</div>
));
jest.mock('../../../../src/ui/home/table/AthleteTableRow', () => ({
  AthleteRow: ({ athlete }) => (
    <div>
      <span>{athlete.name}</span>
      <span>{athlete.age}</span>
      <span>{athlete.team}</span>
    </div>
  ),
}));

describe('AthleteTable', () => {
  const athletes: IAthlete[] = [
    { id: '1', name: 'John Doe', age: 25, team: 'Team A' },
    { id: '2', name: 'Jane Smith', age: 30, team: 'Team B' },
  ];

  it('renders athlete table header and rows correctly', () => {
    render(<AthleteTable athletes={athletes} />);

    expect(screen.getByText(/Athlete Table Header/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/25/i)).toBeInTheDocument();
    expect(screen.getByText(/30/i)).toBeInTheDocument();
    expect(screen.getByText(/Team A/i)).toBeInTheDocument();
    expect(screen.getByText(/Team B/i)).toBeInTheDocument();
  });

  it('renders when no athletes are provided', () => {
    render(<AthleteTable athletes={[]} />);

    expect(screen.getByText(/Athlete Table Header/i)).toBeInTheDocument();
    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Jane Smith/i)).not.toBeInTheDocument();
  });
});
