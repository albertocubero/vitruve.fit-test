import React from 'react';
import { render, screen } from '@testing-library/react';
import { AthleteRow } from '../../../../src/ui/home/table/AthleteTableRow';
import { IAthlete } from '../../../../src/domain/types/IAthlete';

jest.mock('../../../../src/ui/home/table/AthleteInfo', () => {
  return ({ athlete }: { athlete: IAthlete }) => (
    <div data-testid="athlete-info">
      {athlete.name} - {athlete.age} - {athlete.team}
    </div>
  );
});

jest.mock('../../../../src/ui/home/table/AthleteTableActions', () => ({
  AthleteTableActions: ({ athleteId }: { athleteId: string }) => (
    <div data-testid="athlete-actions">Actions for {athleteId}</div>
  ),
}));

describe('AthleteRow', () => {
  const mockAthlete: IAthlete = {
    id: '1',
    name: 'John Doe',
    age: 25,
    team: 'Team A',
  };

  it('renders athlete info and actions', () => {
    render(<AthleteRow athlete={mockAthlete} />);

    expect(screen.getByTestId('athlete-info')).toHaveTextContent(
      'John Doe - 25 - Team A'
    );
    expect(screen.getByTestId('athlete-actions')).toHaveTextContent(
      'Actions for 1'
    );
  });
});
